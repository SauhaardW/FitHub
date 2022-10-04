import React from 'react';
import './Pages.css';
import AddFriends from './AddFriends';

class Friends extends React.Component {
    render() {
        return (
           <AddFriends />
        );
    }
}

// const Friends = () => {

//     return(<div>
//         <AddFriendsButton/>
//             {/* <Router> */}
//                 <Routes>
//                     <Route exact path='/friends/addFriends' element={<AddFriends/>} />
//                 </Routes>  
//             {/* </Router> */}
//     </div>)
// }


export default Friends;