import React from 'react'
import UserLoginComponent from '@/component/User/UserLoginComponent'
import UserAccountRegisterComponent from '@/component/User/UserAccountRegisterComponent'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function UserLoginPage() {
  return (
    <Box sx={{ flexGrow: 5 }}>
			<Grid container spacing={2}>
				<Grid item xs={8}>
          <UserLoginComponent/>
				</Grid>
				<Grid item xs={4}>
        	<UserAccountRegisterComponent/>
				</Grid>
			</Grid>
		</Box>
  )
}
