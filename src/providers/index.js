import ReactQueryProvider from "./reactQueryProvider";

export default function Providers({ children }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
