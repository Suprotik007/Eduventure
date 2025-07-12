import React, {  use, useState} from 'react';
import { AuthContext } from '../Providers/AuthProvider';
;

 const  useAuth = () => {
    const authInfo=use(AuthContext)
  const [userRole, setUserRole] = useState(null);



   return authInfo
 };

 export default useAuth