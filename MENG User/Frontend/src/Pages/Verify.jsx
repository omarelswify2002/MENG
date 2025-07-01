// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContextProvider";
// import { useSearchParams} from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Verify() {
//     const { token, setCartItems, backendUrl ,navigate } = useContext(ShopContext);
//     const [searchParams] = useSearchParams();
//     const [isVerifying, setIsVerifying] = useState(true);

//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');
//     const userId = searchParams.get('userId');

//     async function verifyPayment() {
//         try {
//             setIsVerifying(true);

//             const response = await axios.get(`${backendUrl}/api/order/verifyStripe`, {
//                 params: { success, orderId, userId },
//                 headers: { token },
//                 timeout: 10000 // 10 ثواني كحد أقصى
//             });

//             if (response.data.success) {
//                 toast.success("تم تأكيد الدفع بنجاح!");
//                 setCartItems({});
//                 navigate('/orders', { replace: true });
//             } else {
//                 toast.warning("فشل في عملية الدفع");
//                 navigate('/cart', { replace: true });
//             }
//         } catch (error) {
//             console.error("Payment Verification Error:", error);
//             navigate('/', { replace: true });
//         } finally {
//             setIsVerifying(false);
//         }
//     }

//     useEffect(() => {
//         verifyPayment();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             {isVerifying ? (
//             <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className="mt-4 text-lg">جاري التحقق من حالة الدفع...</p>
//             </div>
//             ) : (
//             <div className="text-center">
//                 <p className="text-xl">جارٍ إعادة توجيهك...</p>
//             </div>
//             )}
//         </div>
//     );
// }