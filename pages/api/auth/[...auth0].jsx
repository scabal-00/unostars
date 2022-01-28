import { handleAuth } from "@auth0/nextjs-auth0";

console.log("the AUTH0_SECRET env var is set: ", !!process.env.AUTH0_SECRET);

export default handleAuth();

// this file manages this routes

// /api/auth/login
// /api/auth/callback
// /api/auth/logout
// /api/auth/me

// const { user } = useUser();
// {
//   !user && (
//     <>
//       <button>
//         <Link href="/api/auth/login">
//           <a>Login</a>
//         </Link>
//       </button>
//     </>
//   );
// }
// {
//   user && (
//     <>
//       <img src={user.picture} alt={user.name} />
//       <h2> Welcome {user.name}</h2>

//       <button>
//         <Link href="/api/auth/logout">
//           <a>Logout</a>
//         </Link>
//       </button>
//     </>
//   );
// }
