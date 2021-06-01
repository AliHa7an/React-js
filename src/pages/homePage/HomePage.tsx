import React, { useState, useCallback } from 'react'
import '../../style/homePage.css'
import EditProfile from '../profile/EditProfile'
import '../../style/dialog.css'
import CustomModal from '../../components/dialogBox/Dialog'
import Button from '../../components/buttonComponent/ButtonComponent'
import HomeScreen from './HomeScreen'
import { authActions } from '../../store/reducers/auth'
import { useAppDispatch } from '../../store/store'
import { useHistory } from 'react-router'


const HomePage: React.FC = props => {
    const [isOpen, setDialog] = useState<boolean>(false)
    const dispatch = useAppDispatch()
//    const { history } = props
    const history = useHistory()


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