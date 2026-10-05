from flask import Flask, jsonify, request, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from zoneinfo import ZoneInfo

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:123@localhost:5432/WebPizza" 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.secret_key = "12345678910"

db = SQLAlchemy(app)
CORS(app, supports_credentials = True)

vn_time = datetime.now(ZoneInfo("Asia/Ho_Chi_Minh"))

class Customer(db.Model):
    __tablename__ = 'customers'

    customer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100))
    address = db.Column(db.Text, nullable=False)
    password = db.Column(db.String(100), nullable=False, default='')
    created_at = db.Column(db.DateTime, default=vn_time)

    orders = db.relationship('Order', backref='customer', lazy=True, cascade='all, delete-orphan')


class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    size = db.Column(db.Float)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, default=0)
    type_product = db.Column(db.String(20), nullable=False)

    order_details = db.relationship('OrderDetail', backref='product', lazy=True)


class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    order_date = db.Column(db.DateTime, default=vn_time)
    total_price = db.Column(db.Numeric(10, 2), default=0.00)
    status = db.Column(db.String(20), default='xac nhan')

    order_details = db.relationship('OrderDetail', backref='order', lazy=True, cascade='all, delete-orphan')



class OrderDetail(db.Model): 
    __tablename__ = 'order_details'

    order_detail_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)



    @property
    def item_total(self):
        return self.quantity * self.unit_price

UPLOAD_FOLDER = 'static/images'
os.makedirs(UPLOAD_FOLDER, exist_ok = True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/add_product', methods=['POST'])
def add_product():
    try:
        masanpham = request.form.get('masanpham')
        tensanpham = request.form.get('tensanpham')
        gia = request.form.get('gia')
        soluong = request.form.get('soluong')
        kichthuoc = request.form.get('kichthuoc')
        loaisanpham = request.form.get('loaisanpham')

        image_file = request.files.get('anhsanpham')

        if not all([masanpham, tensanpham, gia, soluong, kichthuoc, image_file]):
            return jsonify({'message': 'Thiếu thông tin'}), 400
        if not masanpham or not masanpham.isdigit():
            return jsonify({'message': 'Invalid or missing product ID'}), 400
        
        existing_product = Product.query.filter_by( product_id = int(masanpham)).first()
        if existing_product:
            return jsonify({'message': 'Mã sản phẩm đã tồn tại'}), 401

        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(image_path)

        new_product = Product(
            product_id = int(masanpham),
            name = tensanpham,
            image_url = image_path, 
            size = float(kichthuoc),
            price = int(gia),
            quantity = int(soluong),
            type_product = loaisanpham,
        )
        db.session.add(new_product)
        db.session.commit()

        return jsonify({'message': 'Sản phẩm đã được thêm'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500
@app.route('/edit_product', methods=['POST'])
def edit_product():
    try:
        masanpham = request.form.get('masanpham')
        tensanpham = request.form.get('tensanpham')
        gia = request.form.get('gia')
        soluong = request.form.get('soluong')
        kichthuoc = request.form.get('kichthuoc')

        if not all([gia, soluong, kichthuoc]):
            return jsonify({'message': 'Thiếu thông tin'}), 400
        

        product = Product.query.filter_by(product_id = int(masanpham), name = tensanpham).first()
        if not product:
            return jsonify({'message': 'Không tìm thấy sản phẩm cần cập nhật'}), 404

        product.price = int(gia)
        product.quantity = int(soluong)
        product.size = float(kichthuoc)

        db.session.commit()

        return jsonify({'message': 'Sản phẩm đã được sửa'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500
    
@app.route('/product_info', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for p in products:
        image_url = url_for('static', filename='images/' + os.path.basename(p.image_url), _external=True)
    
        if p.type_product == "food":
            loai = 'Thức ĂN'
        if p.type_product == "drink":
            loai = 'Đồ uống'

        
        product_data = {
            'masanpham': p.product_id,
            'tensanpham': p.name,
            'anhsanpham': image_url,  
            'kichthuoc': p.size,
            'gia': float(p.price),
            'soluong': p.quantity,
            'loaisanpham': loai,
        }
        output.append(product_data)
    return jsonify(output)
@app.route('/user_info', methods=['GET'])
def get_users():
    users = Customer.query.all()
    output = []
    for u in users:
        user_data = {
            'makhachhang': u.customer_id,
            'tenkhachhang': u.name,
            'sodienthoai': str(u.phone).zfill(10), 
            'email': u.email,
            'diachi': u.address,
            'ngaydangky': u.created_at
        }
        output.append(user_data)
    return jsonify(output)
@app.route('/delete_user', methods=['POST'])
def delete_user():
    try:
        makhachhang = request.form.get('makhachhang')
        if not makhachhang:
            return jsonify({'message': 'Thiếu mã khách hàng'}), 400

        user = Customer.query.filter_by(customer_id=int(makhachhang)).first()
        if not user:
            return jsonify({'message': 'Không tìm thấy khách hàng để xóa'}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': f'Đã xóa khách hàng có mã {makhachhang} cùng các đơn hàng liên quan'}), 200

    except Exception as e:
        print("Error:", e)
        db.session.rollback()
        return jsonify({'message': 'Lỗi máy chủ'}), 500

@app.route('/delete_product', methods=['POST'])
def delete_product():
    try:
        masanpham = request.form.get('masanpham')
        if not masanpham:
            return jsonify({'message': 'Thiếu mã sản phẩm'}), 400

        product = Product.query.filter_by(product_id=int(masanpham)).first()
        if not product:
            return jsonify({'message': 'Không tìm thấy sản phẩm'}), 404

        # kiểm tra flag force (nếu gửi force='true' sẽ xóa cả order details liên quan)
        force = request.form.get('force') == 'true'

        if product.order_details and not force:
            return jsonify({'message': 'Không thể xóa sản phẩm vì có đơn hàng liên quan'}), 400

        # Nếu force, xóa các OrderDetail liên quan, và xóa các Order rỗng sau đó
        if product.order_details and force:
            try:
                # xóa từng OrderDetail liên quan đến sản phẩm
                details = OrderDetail.query.filter_by(product_id=product.product_id).all()
                for d in details:
                    db.session.delete(d)

                db.session.flush()

                # xóa các đơn hàng không còn chi tiết
                orders = Order.query.all()
                for o in orders:
                    if not o.order_details:
                        db.session.delete(o)
            except Exception as e:
                print("Error while deleting related order details:", e)
                db.session.rollback()
                return jsonify({'message': 'Lỗi khi xóa dữ liệu liên quan'}), 500

        db.session.delete(product)
        db.session.commit()

        return jsonify({'message': 'Sản phẩm đã được xóa'}), 200

    except Exception as e:
        print("Error:", e)
        db.session.rollback()
        return jsonify({'message': 'Lỗi máy chủ'}), 500

@app.route('/signup', methods=['POST'])
def signup():
    try:
        hovaten = request.form.get('hovaten')
        sodienthoai = request.form.get('sodienthoai')
        email = request.form.get('email')
        matkhau = request.form.get('matkhau')
        diachi = request.form.get('diachi')

        if not all([hovaten, sodienthoai, email, matkhau, diachi]):
            return jsonify({'message': 'Thiếu thông tin'}), 400
        
        existing_user = Customer.query.filter_by( phone = sodienthoai).first()
        if existing_user:
            return jsonify({'message': 'Số điện thoại đã tồn tại'}), 401

        new_user = Customer(
            name = hovaten,
            phone = sodienthoai, 
            email = email,
            address = diachi,
            password = matkhau,
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Đăng ký thành công'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Đăng xuất thành công'}), 200
@app.route('/login', methods=['POST'])
def login():
    try:
        sodienthoai = request.form.get('sodienthoai')
        matkhau = request.form.get('matkhau')

        if not all([sodienthoai, matkhau]):
            return jsonify({'message': 'Thiếu thông tin'}), 400

        adminphone = "0835385003"
        adminpass = "admin@pizza123"

        if sodienthoai == adminphone and matkhau == adminpass:
            return jsonify({'message': 'Đăng nhập admin thành công', 'role': 'admin'}), 200

        user = Customer.query.filter_by(phone=sodienthoai).first()

        if not user:
            return jsonify({'message': 'Bạn chưa được đăng ký!'}), 404

        if user.password != matkhau:
            return jsonify({'message': 'Mật khẩu của bạn không đúng!'}), 401

        session['user_id'] = user.customer_id 

        return jsonify({
            'message': 'Đăng nhập thành công',
            'user_id': user.customer_id,
            'tenkhachhang': user.name,
            'role': 'user'
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500


@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    makhachhang = request.args.get('makhachhang')
    if not makhachhang:
        return jsonify({'message': 'Thiếu mã khách hàng'}), 400

    user = Customer.query.filter_by( customer_id = int(makhachhang)).first()
    if not user:
        return jsonify({'message': 'Không tìm thấy khách hàng'}), 404

    user_data = {
        'makhachhang': user.customer_id,
        'tenkhachhang': user.name,
        'sodienthoai': str(user.phone).zfill(10),
        'email': user.email,
        'diachi': user.address,
        'ngaydangky': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'matkhau': user.password
    }

    return jsonify(user_data), 200
@app.route('/edit_user', methods=['POST'])
def edit_user():
    try:
        makhachhang = request.form.get('makhachhang')
        tenkhachhang = request.form.get('tenkhachhang')
        sodienthoai = request.form.get('sodienthoai')
        matkhau = request.form.get('matkhau')
        email = request.form.get('email')
        diachi = request.form.get('diachi')
        

        if not all([makhachhang, tenkhachhang, sodienthoai, matkhau, email, diachi]):
            return jsonify({'message': 'Thiếu thông tin'}), 400
        

        users = Customer.query.filter_by(customer_id = int(makhachhang)).first()
        if not users:
            return jsonify({'message': 'Không tìm thấy khách hàng'}), 404
        
        users.customer_id = makhachhang
        users.name = tenkhachhang
        users.email = email
        users.address = diachi
        users.password = matkhau

        db.session.commit()

        return jsonify({'message': 'Sản phẩm đã được sửa'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500

@app.route('/get_buy_product', methods=['GET'])
def get_buy_product():
    user_id = request.args.get('user_id')
    date_str = request.args.get('date')

    try:
        if not user_id:
            return jsonify({'message': 'Thiếu mã khách hàng'}), 400
        
        query = Order.query.filter_by(customer_id = user_id)
        if date_str:
            chosen_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            query = query.filter(db.func.date(Order.order_date) == chosen_date)

        orders = query.order_by(Order.order_date.desc()).all()

        result = []
        for order in orders:
            for detail in order.order_details:
                product = Product.query.get(detail.product_id)
                image_url = ''
                if product and product.image_url:
                    image_filename = os.path.basename(product.image_url)
                    image_url = url_for('static', filename='images/' + image_filename, _external=True)
                result.append({
                    'madathang': order.order_id,
                    'tensanpham': product.name if product else 'Không xác định',
                    'soluong': detail.quantity,
                    'dongia': float(detail.unit_price),
                    'tonggia': float(detail.quantity * detail.unit_price),
                    'ngaydathang': order.order_date.strftime('%d-%m-%Y'),
                    'trangthai': convert_status(order.status),
                    'anhsanpham': image_url
                })

        return jsonify(result), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500



def convert_status(status_code):
    status_code = status_code.lower()
    if status_code == 'da giao':
        return 'Đã giao'
    elif status_code == 'dang giao':
        return 'Đang giao'
    elif status_code == 'dang chuan bi':
        return 'Đang chuẩn bị'
    elif status_code == 'xac nhan':
        return 'Xác nhận'
    else:
        return 'Không xác định'
    
@app.route('/buy_product', methods=['POST'])
def buy_product():
    try:
        makhachhang = request.form.get('makhachhang')
        masanpham = request.form.get('masanpham')
        soluong = request.form.get('soluong')
        tonggia = request.form.get('tonggia')

        if 'user_id' not in session:
            return jsonify({'message': 'Bạn vui lòng đăng nhập trước!'}), 405

        user_id = session['user_id'] 

        if not all([masanpham, soluong, tonggia]):
            return jsonify({'message': 'Thiếu thông tin đơn hàng'}), 400

        product = Product.query.filter_by(product_id=int(masanpham)).first()
        if not product:
            return jsonify({'message': 'Không tìm thấy sản phẩm'}), 404

        if product.quantity == 0:
            return jsonify({'message': 'Sản phẩm đã hết hàng!'}), 402

        if product.quantity < int(soluong):
            return jsonify({'message': 'Số lượng sản phẩm không đủ'}), 401

        new_order = Order(
            customer_id = int(makhachhang),
            total_price = float(tonggia),
            status = 'xac nhan'
        )
        db.session.add(new_order)
        db.session.flush()

        order_detail = OrderDetail(
            order_id=new_order.order_id,
            product_id=int(masanpham),
            quantity=int(soluong),
            unit_price=float(product.price)
        )
        db.session.add(order_detail)

        product.quantity -= int(soluong)

        db.session.commit()
        return jsonify({'message': 'Mua hàng thành công'}), 200

    except Exception as e:
        print("Error in /buy_product:", e)
        db.session.rollback()
        return jsonify({'message': 'Lỗi máy chủ'}), 500

@app.route('/get_all_orders', methods=['GET'])
def get_all_orders():
    date_str = request.args.get('date', default=None)
    query = Order.query

    if date_str:
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            query = query.filter(db.func.date(Order.order_date) == date_obj)
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

    orders = query.order_by(Order.order_date.desc()).all()

    result = []
    for order in orders:
        for detail in order.order_details:
            product = Product.query.get(detail.product_id)
            image_url = ''
            if product and product.image_url:
                image_url = url_for('static', filename='images/' + os.path.basename(product.image_url), _external=True)
            
            trang_thai = order.status
            if trang_thai == "xac nhan":
                trang_thai = "Xác nhận"
            elif trang_thai == "dang chuan bi":
                trang_thai = "Đang chuẩn bị"
            elif trang_thai == "dang giao":
                trang_thai = "Đang giao"
            elif trang_thai == "da giao":
                trang_thai = "Đã giao"

            result.append({
                'madathang': order.order_id,
                'tenkhachhang': order.customer.name if order.customer else 'Unknown',
                'sodienthoai': str(order.customer.phone).zfill(10) if order.customer else '',
                'tensanpham': product.name if product else 'Unknown',
                'anhsanpham': image_url,
                'soluong': detail.quantity,
                'dongia': float(detail.unit_price),
                'tonggia': float(detail.quantity * detail.unit_price),
                'ngaydathang': order.order_date.strftime('%Y-%m-%d'),
                'status': trang_thai,
            })

    return jsonify(result), 200

@app.route('/update_order_status', methods=['POST'])
def update_order_status():
    data = request.get_json()
    order_id = data.get('order_id')
    new_status = data.get('new_status')

    if not order_id or not new_status:
        return jsonify({'error': 'Missing order_id or new_status'}), 400

    order = Order.query.filter_by(order_id = order_id).first()
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    order.status = new_status
    db.session.commit()

    return jsonify({'message': 'Order status updated successfully'}), 200

@app.route('/dashboard_summary', methods=['GET'])
def dashboard_summary():
    try:
        total_revenue = db.session.query(db.func.sum(Order.total_price)).scalar() or 0

        total_customers = Customer.query.count()

        total_orders = Order.query.count()

        return jsonify({
            'doanh_thu': float(total_revenue),
            'so_khach_hang': total_customers,
            'tong_don_hang': total_orders
        }), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500
@app.route('/get_all_orders_new', methods=['GET'])
def get_all_orders_new():
    try:
        orders = Order.query.order_by(Order.order_date.desc()).limit(3).all()

        result = []
        for order in orders:
            for detail in order.order_details:
                product = Product.query.get(detail.product_id)
                image_url = ''
                if product and product.image_url:
                    image_filename = os.path.basename(product.image_url)
                    image_url = url_for('static', filename='images/' + image_filename, _external=True)

                result.append({
                    'madathang': order.order_id,
                    'tenkhachhang': order.customer.name if order.customer else 'Không rõ',
                    'sodienthoai': order.customer.phone if order.customer else 'Không rõ',
                    'tensanpham': product.name if product else 'Không xác định',
                    'soluong': detail.quantity,
                    'dongia': float(detail.unit_price),
                    'tonggia': float(detail.quantity * detail.unit_price),
                    'ngaydathang': order.order_date.strftime('%d-%m-%Y'),
                    'trangthai': convert_status(order.status),
                    'anhsanpham': image_url
                })

        return jsonify(result), 200

    except Exception as e:
        print("Lỗi khi lấy 10 đơn hàng gần nhất:", e)
        return jsonify({'message': 'Lỗi máy chủ'}), 500
@app.route('/get_user_stats', methods=['GET'])
def get_user_stats():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400

    orders = Order.query.filter_by(customer_id=user_id).all()

    total_orders = len(orders)
    total_amount = 0

    for order in orders:
        for detail in order.order_details:
            total_amount += detail.quantity * detail.unit_price

    return jsonify({
        'total_orders': total_orders,
        'total_amount': total_amount
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
