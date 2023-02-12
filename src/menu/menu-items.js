import { Login, RefreshToken } from '../features/auth';
import {
    LocationLevelsGetList, LocationLevelsCreate, LocationLevelsGetInstance,
    LocationLevelsUpdate, LocationLevelsDelete } from '../features/location-levels';


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
            { title: 'Create', component: LocationLevelsCreate },
            { title: 'Get Instance', component: LocationLevelsGetInstance },
            { title: 'Update', component: LocationLevelsUpdate },
            { title: 'Delete', component: LocationLevelsDelete },
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