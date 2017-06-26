import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';

class Template extends Component {

   render() {

      return (

         <div>
            
            <Header />

               <div className="main-content">
                  {this.props.children}
               </div>

            <Footer />

         </div>
      );
   }
}

export default Template;
