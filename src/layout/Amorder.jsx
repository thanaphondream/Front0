import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Amorder() {
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchData = async (url, setState) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setState(response.data);
                console.log(response)
            } catch (err) {
                console.error(`Error fetching data from ${url}: ${err}`);
            }
        };

        fetchData('http://localhost:8000/payment/getpayments', data => setPayments(data.payment));
        fetchData('http://localhost:8000/auth/amorder', setOrders);
    }, []);

    return (
        <div className="container mx-auto p-4">
            {orders.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">ยังไม่มีสินค้า</p>
            ) : (
                orders.map(order => {
                    const firstCart = order.orderCarts[0]; // Get the first cart to extract user details
                    const user = firstCart?.cartclone?.user; // Extract user information

                    return (
                        <div key={order.id} className="mb-6 p-4 border rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mt-1 mb-4">Order: {order.id}</h3>
                            <p className="text-lg font-semibold">Status: {order.status}</p>
                            <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                            

                            {user && (
                                <div>
                                    <p className="text-lg font-semibold">ชื่อผู้สั่ง: {user.name}</p>
                                    <p className="text-gray-600">เบอร์: {user.phone}</p>
                                </div>
                            )}

                            <h4 className="text-lg font-bold mt-4">Payments:</h4>
                            {payments.filter(payment => payment.order.id === order.id).length === 0 ? (
                                <p className="text-gray-600">ยังไม่มีการชำระเงินสำหรับออเดอร์นี้</p>
                            ) : (
                                payments.filter(payment => payment.order.id === order.id).map(payment => (
                                    <div key={payment.id} className="mb-6 p-4 border rounded-lg shadow-lg">
                                        <p className="text-lg font-semibold">การจัดส่ง: {payment.status}</p>
                                        
                                        {payment.location && (
                                            <div>
                                                <p>บ้านเลขที่: {payment.location.house_number}</p>
                                                <p>จังหวัด: {payment.location.provinces}</p>
                                                <p>อำเภอ: {payment.location.amphures}</p>
                                                <p>ตำบล: {payment.location.districts}</p>
                                                <p>ถนน: {payment.location.road}</p>
                                                <p>หมู่บ้าน: {payment.location.village}</p>
                                                <p>รหัสไปรษณีย์: {payment.location.zip_code}</p>
                                                <p>อื่นๆ: {payment.location.other}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            <ul>
                                {order.orderCarts.map(cart => (
                                    <li key={cart.id} className="mb-4 p-4 border rounded-md bg-gray-50">
                                        {/* <p className="text-gray-700">Total: {cart.cartclone?.total || 'N/A'}</p>
                                        <p className="text-gray-700">Price: {cart.cartclone.all_price}</p> */}
                                        <div className="flex items-center mt-2">
                                            <img
                                                src={cart.cartclone?.product?.image || 'placeholder.jpg'}
                                                alt={cart.cartclone?.product?.name || 'Product Image'}
                                                className="w-24 h-24 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <p className="text-gray-600">{cart.cartclone?.product?.name || 'Product Name'}</p>
                                                <p className="text-gray-600">Category: {cart.cartclone?.product?.category || 'N/A'}</p>
                                                <p className="text-gray-600">Price: {cart.cartclone?.product?.price || 'N/A'}</p>
                                                <p className="text-gray-700">Total: {cart.cartclone?.total || 'N/A'}</p>
                                                <p className="text-gray-700">Price: {cart.cartclone.all_price}</p>
                                                
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                            {payments.filter(payment => payment.order.id === order.id).map(payment => (
                                <h4 className="text-lg font-bold mt-4">ราคารวม {payment.all_price}</h4>
                            ))}

                            
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Amorder;




// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Amorder() {
//     const [orders, setOrders] = useState([]);
//     const [payments, setPayments] = useState([]);

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:8000/payment/getpayments', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setPayments(response.data.payment);
//                 console.log(response.data);
//             } catch (err) {
//                 console.error(`Error fetching payments: ${err}`);
//             }
//         };
//         fetchPayments();
//     }, []);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:8000/auth/amorder', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrders(response.data);
//                 console.log(response.data);
//             } catch (err) {
//                 console.log(`เกิดข้อผิดพลาด: ${err}`);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {orders.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">ยังไม่มีสินค้า</p>
//             ) : (
//                 orders.map(order => (
//                     <div key={order.id} className="mb-6 p-4 border rounded-lg shadow-lg">
//                         <p className="text-lg font-semibold">Status: {order.status}</p>
//                         <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
//                         <h3 className="text-xl font-bold mt-4 mb-2">Order:</h3>
//                         {/* {order.orderCarts.map(cart => (
//                             <div key={cart.id}>
//                                 <p className="text-lg font-semibold">ชื่อผู้สั่ง: {cart.cartclone.user.name}</p>
//                                 <p className="text-gray-600">เบอร์: {cart.cartclone.user.phone}</p>
//                             </div>
//                         ))} */}
//                         <ul>
//                             {order.orderCarts.map(cart => (
//                                 <li key={cart.id} className="mb-4 p-4 border rounded-md bg-gray-50">
//                                     <p className="text-gray-700">Total: {cart.cartclone.total}</p>
//                                     {/* <p className="text-gray-700">Price: {cart.cartclone.all_price}</p> */}
//                                     <div className="flex items-center mt-2">
//                                         <img 
//                                             src={cart.cartclone.product.image} 
//                                             alt={cart.cartclone.product.name} 
//                                             className="w-24 h-24 object-cover rounded-lg mr-4" 
//                                         />
//                                         <div>

//                                         <p className="text-lg font-semibold">ชื่อผู้สั่ง: {cart.cartclone.user.name}</p>
//                                         <p className="text-gray-600">เบอร์: {cart.cartclone.user.phone}</p>
//                                             <p className="text-gray-600">{cart.cartclone.product.name}</p>
//                                             <p className="text-gray-600">Category: {cart.cartclone.product.category}</p>
//                                             <p className="text-gray-600">Price: {cart.cartclone.product.price}</p>
                                            
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>

//                         <h4 className="text-lg font-bold mt-4">Payments:</h4>
//                         {payments.filter(payment => payment.order.id === order.id).length === 0 ? (
//                             <p className="text-gray-600">ยังไม่มีการชำระเงินสำหรับออเดอร์นี้</p>
//                         ) : (
//                             payments.filter(payment => payment.order.id === order.id).map(payment => (
//                                 <div key={payment.id} className="mb-6 p-4 border rounded-lg shadow-lg">
//                                     <p className="text-lg font-semibold">การจัดส่ง: {payment.status}</p>
//                                     {/* <p className="text-gray-600">Payment Date: {new Date(payment.date).toLocaleDateString()}</p> */}
//                                     <div>
//                                         {payment.location && (
//                                             <div>
//                                                 <p>บ้านเลขที่: {payment.location.house_number}</p>
//                                                 <p>จังหวัด: {payment.location.provinces}</p>
//                                                 <p>อำเภอ: {payment.location.amphures}</p>
//                                                 <p>ตำบล: {payment.location.districts}</p>
//                                                 <p>ถนน: {payment.location.road}</p>
//                                                 <p>หมู่บ้าน: {payment.location.village}</p>
//                                                 <p>รหัสไปรษณีย์: {payment.location.zip_code}</p>
//                                                 <p>อื่นๆ: {payment.location.other}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Amorder;

















// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Amorder() {
//     const [orders, setOrders] = useState([]);
    

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios('http://localhost:8000/auth/amorder', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrders(response.data);
//                 console.log(response.data);
//             } catch (err) {
//                 console.log(`เกิดข้อผิดพลาด: ${err}`);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {orders.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">ยังไม่มีสินค้า</p>
//             ) : (
//                 orders.map(order => (
//                     <div key={order.id} className="mb-6 p-4 border rounded-lg shadow-lg">
//                         <p className="text-lg font-semibold">Status: {order.status}</p>
//                         <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
//                         <h3 className="text-xl font-bold mt-4 mb-2">Order:</h3>
                        
//                         <ul>
//                             {order.orderCarts.map(cart => (
//                                 <li key={cart.id} className="mb-4 p-4 border rounded-md bg-gray-50">
//                                     <p className="text-gray-700">Total: {cart.cartclone.total}</p>
//                                     <p className="text-gray-700">Price: {cart.cartclone.all_price}</p>
//                                     <div className="flex items-center mt-2">
//                                         <img 
//                                             src={cart.cartclone.product.image} 
//                                             alt={cart.cartclone.product.name} 
//                                             className="w-24 h-24 object-cover rounded-lg mr-4" 
//                                         />
//                                         <div>
//                                             <p className="text-lg font-semibold">{cart.cartclone.product.name}</p>
//                                             <p className="text-gray-600">Category: {cart.cartclone.product.category}</p>
//                                             <p className="text-gray-600">Price: {cart.cartclone.product.price}</p>
//                                             <p className="text-gray-600">ชื่อผู้สั่ง: {cart.cartclone.user.name}</p>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Amorder;














// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Amorder() {
//     const [payments, setPayments] = useState([]);

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:8000/payment/getpayments', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setPayments(response.data.payment);
//                 console.log(response.data);
//             } catch (err) {
//                 console.error(`Error fetching payments: ${err}`);
//             }
//         };
//         fetchPayments();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {payments.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">ยังไม่มีสินค้า</p>
//             ) : (
//                 payments.map(payment => (
//                     <div key={payment.id} className="mb-6 p-4 border rounded-lg shadow-lg">
//                         <p className="text-lg font-semibold">Status: {payment.status}</p>
//                         <p className="text-gray-600">Date: {new Date(payment.date).toLocaleDateString()}</p>
//                         <h3 className="text-xl font-bold mt-4 mb-2">Order:</h3>

//                         <div>
//                             <p>Status: {payment.order.status}</p>
//                             {payment.location && (
//                                 <div>
                                    
//                                     <p>บ้านเลขที่: {payment.location.house_number}</p>
//                                     <p>จังหวัด: {payment.location.provinces}</p>
//                                     <p>อำเภอ: {payment.location.amphures}</p>
//                                     <p>ตำบล: {payment.location.districts}</p>
//                                     <p>ถนน: {payment.location.road}</p>
//                                     <p>หมู่บ้าน: {payment.location.village}</p>
//                                     <p>รหัสไปรษณีย์: {payment.location.zip_code}</p>
//                                     <p>อื่นๆ: {payment.location.other}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Amorder;












































// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Amorder() {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios('http://localhost:8000/auth/amorder', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrders(response.data);
//                 console.log(response.data);
//             } catch (err) {
//                 console.log(`เกิดข้อผิดพลาด: ${err}`);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {orders.map(order => (
//                 <div key={order.id} className="mb-6 p-4 border rounded-lg shadow-lg">
//                     <p className="text-lg font-semibold">Status: {order.status}</p>
//                     <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
//                     <h3 className="text-xl font-bold mt-4 mb-2">Order:</h3>
//                     <ul>
//                         {order.orderCarts.map(cart => (
//                             <li key={cart.id} className="mb-4 p-4 border rounded-md bg-gray-50">
//                                 <p className="text-gray-700">Total: {cart.cartclone.total}</p>
//                                 <p className="text-gray-700">Price: {cart.cartclone.all_price}</p>
//                                 <div className="flex items-center mt-2">
//                                     <img src={cart.cartclone.product.image} alt={cart.cartclone.product.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
//                                     <div>
//                                         <p className="text-lg font-semibold">{cart.cartclone.product.name}</p>
//                                         <p className="text-gray-600">Category: {cart.cartclone.product.category}</p>
//                                         <p className="text-gray-600">Price: {cart.cartclone.product.price}</p>
//                                         <p className="text-gray-600">ชื่อผู้สั่ง: {cart.cartclone.user.name}</p>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Amorder;
