import { 
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserApi } from "utils/handleApi";

const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    useEffect(() => {
      getUserApi(userId, token, setUser) // eslint-disable-next-line
    }, []) 

    if(!user) {
        return null;
    }
    
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impression,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap='0.5rem'
                paddingBottom='1.1rem'
                //removed navigate to profile
            >
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                    
                </FlexBetween>
                <ManageAccountsOutlined />

                </FlexBetween>
                <Divider />

                {/* SECOND ROW */}
                <Box padding='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' marginBottom='0.5rem'
                    >
                        <LocationOnOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>
                            {location}
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem'
                    >
                        <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>
                            {occupation}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                {/* THIRD ROW */}
                <Box padding='1rem 0'>
                    <FlexBetween marginBottom='0.5rem'>
                        <Typography color={medium}>
                            Who's viewed your profile
                        </Typography>
                        <Typography color={medium} fontWeight='500'>
                            {viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>
                            Impressions of your post
                        </Typography>
                        <Typography color={medium} fontWeight='500'>
                            {impression}
                        </Typography>
                    </FlexBetween>
                </Box>
                
                <Divider />

                {/* FOURTH ROW */}
                <Box padding='1rem 0'>
                    <Typography fontSize='1rem' color={main} fontWeight='500' marginBottom='1rem'>
                        Social Profiles
                    </Typography>

                    <FlexBetween gap='1rem' marginBottom='0.5rem'>
                        <FlexBetween gap='1rem'>
                            {/* <img src='../../assets/twitter.png' alt="twitter"/> */}
                            <Twitter fontSize="large" sx={{color: main}} />
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

                    <FlexBetween gap='1rem' marginBottom='0.5rem'>
                        <FlexBetween gap='1rem'>
                            {/* <img src='../../assets/linkedin.png' alt="linkedin"/> */}
                            <LinkedIn fontSize="large" sx={{color: main}} />
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>
                </Box>
            
        </WidgetWrapper>
    )
};

export default UserWidget;
