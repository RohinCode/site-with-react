import BottomFooter from "./bottomFooter";
import FixedFooter from "./fixedFooter";

function Footer({ active }) {
  return (
    <footer>
      <BottomFooter />
      <FixedFooter active={active} />
    </footer>
  );
}

export default Footer;
