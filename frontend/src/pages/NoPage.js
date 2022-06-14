import '../componentsStyles/NoPage.scss';
import { Link } from "react-router-dom";

const NoPage = () => {
    return(
        <div className="no-page">
             <h1>404</h1>
            <Link to="/">Wróć do listy</Link>
        </div>
    ) 
   
  };
  
  export default NoPage;