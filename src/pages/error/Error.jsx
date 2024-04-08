import { Button, Result } from "antd";

const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Trang bạn truy cập hiện tại không khả dụng"
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);
export default App;
