"use client"
import MainPage from './page/mainPage/mainPage';
import Designer from './page/designer/designer';

export default function Home() {


  return (
    <div className='layout-container'>
        <MainPage/>
        <Designer/>
    </div>
  )
}

// const [scrollup, setScrollup] = useState(false);
// onWheel={(e) => onScroll()}
// const onScroll = e => {
//  if(scrollup === false) {
//    setScrollup(true);
// }
//  setTimeout(() => {
//      window.scrollTo({
//        top: 0,
//          behavior: 'smooth', // Optional: Adds smooth scrolling effect
//          });
//  }, 10);

     
//  }