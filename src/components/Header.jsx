import "./Header.css";

const Header = () => {
  const date = new Date();

  return (
    <div className="Header">
      <h3>🌼오늘은</h3>
      <h1>{date.getFullYear().toString()}년 {(date.getMonth()+1).toString()}월 {date.getDate().toString()}일</h1>
    </div>
  )
};

export default Header;