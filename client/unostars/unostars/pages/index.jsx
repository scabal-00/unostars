import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Home() {
  //  user info

  const { user } = useUser();
  console.log(user);

  return (
    <div>
      <h1>Unostars</h1>
      <nav>
        {/* only show if there is no user */}

        {!user && (
          <>
            <button>
              <Link href="/api/auth/login">
                <a>Login</a>
              </Link>
            </button>
          </>
        )}

        {/* show user info and logout */}

        {user && (
          <>
            <img src={user.picture} alt={user.name} />
            <h2> Welcome {user.name}</h2>

            <button>
              <Link href="/api/auth/logout">
                <a>Logout</a>
              </Link>
            </button>
          </>
        )}

        <button>
          <Link href="/dashboard">
            <a>dashboard</a>
          </Link>
        </button>
      </nav>
    </div>
  );
}
