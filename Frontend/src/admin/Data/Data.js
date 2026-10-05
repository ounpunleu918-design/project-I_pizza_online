import {
    BiPieChart,
    BiUser,
    BiCart,
    BiShoppingBag
} from 'react-icons/bi';
export const SidebarData = [
    {
        icon: BiPieChart,
        heading: "Tổng quan",
        path: "/admin"
    },
    {
        icon: BiUser,
        heading: "Khách hàng",
        path: "/customer"
    },
    {
        icon: BiCart,
        heading: "Sản phẩm",
        path: "/product"
    },
    {
        icon: BiShoppingBag,
        heading: "Đơn hàng",
        path: "/order"
    }

];