import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
type props = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: props) {
  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "transparent",
    position: "relative",
    paddingBlock: "24px",
    paddingInline: "40px",
    // backgroundColor: "#0958d9",
  };
  const layoutStyle = {
    borderRadius: 8,
    // overflow: "hidden",
    // width: "calc(50% - 8px)",
    // maxWidth: "calc(50% - 8px)",
  };
  return (
    <Layout style={layoutStyle}>
      {/* <Header style={headerStyle}>Header</Header> */}
      <Content style={contentStyle}>{children}</Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  );
}
