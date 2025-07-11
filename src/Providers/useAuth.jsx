import React, {  use} from 'react';
import { AuthContext } from '../Providers/AuthProvider';
;

 const  useAuth = () => {
    const authInfo=use(AuthContext)
  const [userRole, setUserRole] = useState(null);

// Fetch or set user role: 'student', 'teacher', 'admin'

   return authInfo
 };

 export default useAuth