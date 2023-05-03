// import React, { useState } from "react";
// import "../css/App.css";
// import { useNavigate } from "react-router-dom";
// import "../css/Common.css";

// const API_URI = process.env.REACT_APP_API_URI;

// async function signinUser(credentials) {
//   return fetch(API_URI + "/api/v1/auth/signin", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data);
// }

// const Signin = () => {
//   const navigate = useNavigate();

//   const navigateToSignup = () => {
//     navigate("/signup");
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   // signin 버튼 클릭 이벤트
//   const onClickSignin = async (e) => {
//     e.preventDefault();
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     if(urlSearchParams.has("id")){
//       console.log(urlSearchParams.get("id"));
//     }
//     let response = await signinUser({
//       email,
//       password
//     });
//     console.log(response);
//     if (response.status === 403){
//       window.alert("403 Forbidden");
//     }
//     else if (response.status === 200) {
//       const responseJSON = await response.json();      
//       if ("token" in responseJSON){
//         var receivedToken = responseJSON["token"]
//         localStorage.setItem("token", receivedToken);
//         window.alert("Token: " + receivedToken);
//       }
//     }
//   };

//   return (
//     <div className="signin">
//       <div className="signin-form">
//         <form onSubmit={onClickSignin}>
//           <div>
//             <input
//               className="box signinInfo email"
//               id="email"
//               placeholder="이메일"
//               type="email"
//               onChange={handleEmail}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="비밀번호"
//               id="pw"
//               className="box signinInfo pw"
//               onChange={handlePassword}
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="box signF-bt"
//               onClick={onClickSignin}
//             >
//               로그인
//             </button>
//           </div>
//           <div className="signin-sub">
//             <span className="saveId">
//               아이디 저장
//               <input type="checkbox" />
//             </span>
//             <a href="https://www.naver.com/"> 아이디 찾기</a> |
//             <a href="https://www.naver.com/"> 비밀번호 찾기</a>
//           </div>
//           <div>
//             <button
//               className="box signS-bt"
//               type="button"
//               onClick={navigateToSignup}
//             >
//               회원가입
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;
