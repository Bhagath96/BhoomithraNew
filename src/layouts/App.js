import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Switch } from 'react-router-dom';
import { makeStyles, Components, Icons, I18n } from '../common/components';
import { green as deepGreen } from '@material-ui/core/colors';
import AppMenu from './AppMenu';
import commonTheme, { themeColors } from '../common/theme';
import { getRoutePaths, getExceptionalPaths, PATH } from '../routes';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { logout, setDefaultOrganization } from '../modules/user/actions';
import { STATE_REDUCER_KEY } from '../modules/user/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLanguages, changeLanguage } from '../modules/common/actions';
import { DEFAULT_LANGUAGE } from '../modules/common/constants';
import BreadCrump from '../common/components/custom/BreadCrump';
import preval from 'preval.macro';
import { PROJECT_CONFIG_PROPS } from '../common/constants';
import { getProjectProps } from '../utils/ConfigUtils';
import { CommonRepository } from '../common/pouchDB/repositories';

const { defaultLanguage: projectDefaultLanguage } = getProjectProps(PROJECT_CONFIG_PROPS.I18N);
const { MenuLogo } = getProjectProps(PROJECT_CONFIG_PROPS.COMPONENTS);
const PROJECT_DETAILS = getProjectProps(PROJECT_CONFIG_PROPS.DETAILS);
const buildNumber = preval`const { generate }=require('build-number-generator');module.exports = generate().toLocaleString();`;
const { CssBaseline, Drawer, Container, Typography, AppBar, Toolbar, Divider, Avatar, IconButton, Colors, Grid, Menu, MenuItem, ListSubheader } = Components;
const { MenuIcon, LanguageTwoTone, AccountBoxIcon, PowerSettingsNewIcon } = Icons;


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        },
        '&:hover': {

        }
    }
}))(MenuItem);

const useStyles = makeStyles(theme => ({
    titleIcons: {
        flexDirection: 'row'
    },
    root: {
        display: 'flex',
        overFlow: 'hidden'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',

        paddingBottom: theme.spacing(4),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        ...commonTheme.sidebar,
        overflowY: 'hidden'
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        overflowY: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '#edf1d4'
    },
    container: {
        background: '#edf1d4',
        position: 'relative',
        width: 'calc(100vw - 240px)',
        overflow: 'auto',
        marginTop: theme.spacing(10),
        height: 'calc(100vh - 80px)',
        padding: '10px'

    },
    toolbar: {
        paddingRight: 24

    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'flex-end',
        padding: '0 8px',
        paddingTop: '2px',
        ...theme.mixins.toolbar
    },
    appBar: {
        overflow: 'visible',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        background: '#fffff',
        overflowX: 'visible',
        overflowY: 'visible'
    },
    appBarShift: {
        marginLeft: commonTheme.sidebar.width,
        width: `calc(100% - ${commonTheme.sidebar.width}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    appBarIcon: {
        width: '50px',
        height: '50px'
    },
    menuButton: {
        alignSelf: 'flex-end',
        marginRight: 36,
        color: Colors['theme-basic-color']
    },
    menuButtonHidden: {
        display: 'none'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bottom: 0,
        top: 'auto',
        flex: 1,
        fontSize: 14,
        justifyContent: 'center',
        background: themeColors.themePrimaryColor

    },
    avtTypography: {
        display: 'inline-flex',
        bottom: 0,
        top: 'auto',
        flex: 1,
        fontSize: 13,
        justifyContent: 'center',
        background: Colors['color-basic-800']


    },
    alignTitles: {
        display: 'inline-flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    iconeBorder: {
        color: theme.palette.getContrastText(deepGreen[500]),
        backgroundColor: '#ffffff',
        fontSize: '1 rem'

    },
    cardStyle: {

        borderStyle: 'none',

        width: '100%',
        paddingLeft: '2%',
        paddingTop: '2%',
        paddingRight: '2%'

    },
    smallMenuItem: {
        fontSize: '0.8rem',

        '&:hover': {
            backgroundColor: 'transparent !important'
        }

    },

    bigMenuItem: {
        fontSize: '1rem',
        fontWeight: 'bold',

        backgroundColor: 'transparent !important',
        '&:hover': {
            backgroundColor: 'transparent !important'
        }

    },


    iconCard: {
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        color: '#1b1a1a',
        backgroundColor: Colors['color-basic-800']
    },
    rows: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto'
    },
    menubarWidth:
    {
        minWidth: '0px'
    },
    breadcrump: {
        color: 'black',
        backgroundColor: 'white'
    },
    menuItem: {
        height: '50px !important',
        padding: '10px !important',

        fontWeight: '700 !important'
    }
}));

const styles = {
    menuItemPrimary: {
        height: '50px !important',
        backgroundColor: Colors['color-primary-100']
    },
    avatar: {
        marginRight: '20px',
        color: Colors['color-primary-100'],
        backgroundColor: Colors['color-primary-900']
    },
    smallContent: {
        margin: '-16px 0px -1px',
        lineHeight: '23px'
    }
};

const App = () => {
    const dispatch = useDispatch();
    const { authData, info: { username, firstName, middleName, lastName, defaultOrganization = null }, organization: { data: adminOrganizationsList } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    let selectedLangInStorage = JSON.parse(localStorage.getItem('selectedLanguage'));
    const { defaultLanguage } = useSelector(state => state.common);
    const { allLanguages } = useSelector(state => state.common);
    const [languageMenuOpen, setLanguageMenuOpen] = React.useState(false);
    const [width, setWidth] = React.useState(window.innerWidth);
    const { id: selectedLang } = defaultLanguage;
    const breakpoint = 920;
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    let date = new Date();
    let year = date.getFullYear();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setLanguageMenuOpen(null);
    };
    const handleCloseLogOut = () => {
        CommonRepository.destroyAll();
        dispatch(logout());
        localStorage.clear('persist:root');
        sessionStorage.clear('breadCrumpArray');
        if (localStorage.length === 0) {
            history.push('/');
        }
        setAnchorEl(null);
    };
    const updateWindowDimensions = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (Array.isArray(adminOrganizationsList) && adminOrganizationsList.length > 0) {
            dispatch(setDefaultOrganization(defaultOrganization === null ? adminOrganizationsList[0] : defaultOrganization));
        }
    }, [adminOrganizationsList]);

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        updateWindowDimensions();
        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);
    useEffect(() => {
        if (width < breakpoint) {
            handleDrawerClose();
            return;
        }
        handleDrawerOpen();
    }, [width]);
    useEffect(() => {
        if (Object.keys(authData).length === 0) {
            handleCloseLogOut();
        }
    }, []);
    useEffect(() => {
        dispatch(getAllLanguages());
    }, []);
    const handleProfile = () => {
        history.push(`${PATH.PROFILE}/details`);
    };

    const handleLanguageClick = (event) => {
        setLanguageMenuOpen(event.currentTarget);
    };
    const handleLanguageChange = (id) => {
        let setDefaultLanguage = DEFAULT_LANGUAGE;
        let locale = projectDefaultLanguage || setDefaultLanguage.locale;
        switch (id) {
            case 1:
                locale = 'en-IN';
                setDefaultLanguage.id = 1;
                setDefaultLanguage.locale = locale;
                break;
            case 2:
                locale = 'ml-IN';
                setDefaultLanguage.id = 2;
                setDefaultLanguage.locale = locale;
                break;
            case 3:
                locale = 'mr-IN';
                setDefaultLanguage.id = 3;
                setDefaultLanguage.locale = locale;
                break;
            default:
                locale = projectDefaultLanguage || setDefaultLanguage.locale;
                break;
        }
        localStorage.setItem('selectedLanguage', JSON.stringify(setDefaultLanguage));
        I18n.changeLanguage(locale);
        dispatch(changeLanguage(setDefaultLanguage));
        setLanguageMenuOpen(null);
    };
    let menuLanguages = allLanguages.data.length < 1 ? (selectedLangInStorage ? [{ ...selectedLangInStorage, name: 'DEfault' }] : [{ ...DEFAULT_LANGUAGE, name: 'Default' }]) : allLanguages.data;
    return (
        <div className={clsx(classes.root)} style={{ backgroundColor: 'blue' }} >
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <div>
                        <IconButton
                            edge="start"

                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>

                    <BreadCrump />
                    <div className={clsx(classes.alignTitles)}>

                        <IconButton className={classes.appBarIcon} name='language' color="inherit" onClick={handleLanguageClick}>
                            <LanguageTwoTone />
                        </IconButton>


                        <IconButton name='profile' onClick={handleClick}>
                            {firstName || ''.length > 0 ? <Avatar style={{ ...styles.avatar, marginRight: 0, fontSize: '1rem' }}>{firstName.substr(0, 1)}{lastName.substr(0, 1)}</Avatar> :
                                <Avatar alt="Profile" className={classes.iconeBorder} />}
                        </IconButton>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={languageMenuOpen}
                            keepMounted
                            open={Boolean(languageMenuOpen)}
                            onClose={handleClose}
                        >

                            {
                                menuLanguages?.map((lang, index) => {
                                    let languageName = lang.name;
                                    let selected = lang.id === (selectedLangInStorage?.id ? selectedLangInStorage?.id : selectedLang) ? true : false;
                                    return (
                                        <StyledMenuItem className={classes.menuItem} style={selected ? styles.menuItemPrimary : {}} key={index}
                                            onClick={() => {
                                                handleLanguageChange(lang.id);
                                            }}>
                                            <MenuItem dense divider className={classes.bigMenuItem} >
                                                <Avatar style={styles.avatar}>{I18n.t((languageName.toLowerCase())).substr(0, 1)}</Avatar>
                                                <Typography>{I18n.t(languageName.toLowerCase())}</Typography>
                                            </MenuItem>
                                        </StyledMenuItem>);
                                })}
                        </StyledMenu>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            <StyledMenuItem className={classes.menuItem}>

                                {anchorEl?.name === 'profile' && <ListSubheader >
                                    <MenuItem dense divider className={classes.bigMenuItem} >
                                        <Grid container direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item xs={12} >
                                                <Typography align='center' variant="button" display="block" gutterBottom >
                                                    {firstName || ''.toUpperCase()} {middleName || ''.toUpperCase()} {lastName || ''.toUpperCase()}</Typography>
                                            </Grid>
                                            <br />
                                            <Grid item xs={12} >
                                                <Typography align='center' variant="caption" style={styles.smallContent} display="block" gutterBottom>{username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </ListSubheader>}

                            </StyledMenuItem>

                            <StyledMenuItem className={classes.menuItem} onClick={() => {
                                handleClose(); handleProfile();
                            }}>
                                <AccountBoxIcon fontSize="small" className={classes.smallMenuItem} />
                                <MenuItem className={classes.smallMenuItem} >{I18n.t('my_profile')}</MenuItem>
                            </StyledMenuItem>
                            <StyledMenuItem className={classes.menuItem} onClick={() => handleCloseLogOut()}>
                                <PowerSettingsNewIcon fontSize="small" className={classes.smallMenuItem} />
                                <MenuItem className={classes.smallMenuItem} >{I18n.t('logout')}</MenuItem>
                            </StyledMenuItem>
                        </StyledMenu>
                    </div>
                </Toolbar>


            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, commonTheme.sidebar, !open && classes.drawerPaperClose)
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <div className={classes.rows}>
                        <MenuLogo alt={I18n.t(PROJECT_DETAILS.NAME)} src={PROJECT_DETAILS.LOGO_MENU} />
                        &nbsp;
                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>{I18n.t(PROJECT_DETAILS.NAME)}</Typography>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon style={{ color: Colors['menu-item-icon-color'] }} />
                    </IconButton>
                </div>
                <Divider />
                <div style={{
                    height: '77vh',
                    position: 'relative',
                    width: '240px',

                    padding: '19px 1px',
                    overflowY: 'auto',
                    right: '1px',
                    '@global': {
                        '*::-webkit-scrollbar': {
                            width: '0.4em'
                        },
                        '*::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            outline: '1px solid slategrey'
                        }
                    }
                }} >

                    <AppMenu />
                </div>
                <AppBar position="absolute" className={classes.footer} >
                    <Typography variant='h6' className={classes.footer}>
                        <small> {I18n.t(PROJECT_DETAILS.COPY_RIGHT)} © {year}</small>
                        <small>{I18n.t('powered_by')} {I18n.t(PROJECT_DETAILS.POWERED_BY)}</small>
                        <small>{I18n.t('version')} {PROJECT_DETAILS.VERSION} ({buildNumber})</small>
                    </Typography>
                </AppBar>

            </Drawer>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>

                    <Switch>
                        {getExceptionalPaths()}
                        {getRoutePaths()}
                    </Switch>
                </Container>
            </main>
        </div >
    );
};

export default App;
