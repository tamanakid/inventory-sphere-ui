import { Login, RefreshToken } from '../features/auth';
import { LocationLevelsGetList } from '../features/location-levels';


const menuItems = [
    {
        title: 'Authentication',
        actions: [
            { title: 'Login', component: Login },
            { title: 'Refresh Access Token', component: RefreshToken },
        ]
    },
    {
        title: 'Location Levels',
        actions: [
            { title: 'Get List', component: LocationLevelsGetList },
            { title: 'Get Tree', endpoint: '/' },
            { title: 'Create', endpoint: '/' },
            { title: 'Get Instance', endpoint: '/' },
            { title: 'Update', endpoint: '/' },
            { title: 'Delete', endpoint: '/' }
        ]
    },
    // {
    //     title: 'Locations',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Get Tree', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Categories',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Get Tree', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Attributes',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Attribute Values',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Products',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Product SKUs',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Stock Items',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
    // {
    //     title: 'Users',
    //     actions: [
    //     { title: 'Get List', endpoint: '/' },
    //     { title: 'Create', endpoint: '/' },
    //     { title: 'Get Instance', endpoint: '/' },
    //     { title: 'Update', endpoint: '/' },
    //     { title: 'Delete', endpoint: '/' }
    //     ]
    // },
];

export default menuItems;