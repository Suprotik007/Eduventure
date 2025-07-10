// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import ClassDtlCard from '../Elements/ClassDtlCard';

// const ClassDtl = ({cls})  => {
//      const { _id } = useParams(); 
//     const [classDetail,setClassDetails]=useState([])
//     useEffect(()=>{
//         fetch(`http://localhost:5173/classDtl/${_id}`)
//         .then(res=>res.json())
//         .then(data=>console.log(data))
//         // .then(data=>setClassDetails([data]))
        
        
        
//     },[_id])
//     return (
//         <div>
//                       <h1 className='text-4xl font-semibold text-center '>More About The Class</h1>

//  <div>
//           {/* {
//             classDetail.map(singleClassDetail=>(<ClassDtlCard key={singleClassDetail.id} singleClassDetail={singleClassDetail}></ClassDtlCard>))
//           } */}
//           {
//             classDetail.map(cls=>(<ClassDtlCard key={cls._id} cls={cls}></ClassDtlCard>))
//           }
        
//           </div>
//         </div>
//     );
// };

// export default ClassDtl;

