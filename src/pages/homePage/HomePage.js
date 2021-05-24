import React, { useState, useCallback } from 'react'
import '../../style/homePage.css'
import EditProfile from '../profile/EditProfile'
import '../../style/dialog.css'
import CustomModal from '../../components/dialogBox/Dialog'
import Button from '../../components/buttonComponent/ButtonComponent'
import HomeScreen from './HomeScreen'
import { authActions } from '../../store/auth'
import { useDispatch } from 'react-redux'


const HomePage = (props) => {
    const [isOpen, setDialog] = useState(false)
    const dispatch = useDispatch()
    const { history } = props


    const handleCloseChange = useCallback(
        () => {
            setDialog(show => !show)
        }, [])

    const handleLogout = useCallback(
        () => {
            dispatch(authActions.logout())
            history.push('/')
        }, [dispatch, history])

    return (
        <HomeScreen>
            <Button className="button btn" onClick={handleCloseChange}>Update Profile</Button>
            <Button className="button btn" onClick={handleLogout}>Logout</Button>
            {isOpen && <CustomModal isOpen={isOpen} onClose={handleCloseChange}  >
                <EditProfile />
            </CustomModal>}
        </HomeScreen>
    );
}


export default React.memo(HomePage);