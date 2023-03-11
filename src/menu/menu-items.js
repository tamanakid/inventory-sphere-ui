import { Login, RefreshToken } from '../features/auth';
import {
    LocationLevelsGetList, LocationLevelsCreate, LocationLevelsGetInstance,
    LocationLevelsUpdate, LocationLevelsDelete } from '../features/location-levels';
import {
    LocationsGetList, LocationsGetTree, LocationsCreate, LocationsGetInstance,
    LocationsUpdate, LocationsDelete } from '../features/locations';
import {
    CategoriesGetList, CategoriesGetTree, CategoriesCreate, CategoriesGetInstance,
    CategoriesGetChildren, CategoriesUpdate, CategoriesDelete } from '../features/categories'

import { AttributesGetList, AttributesCreate, AttributesGetInstance,
    AttributesDelete } from '../features/attributes';

import { AttributeValuesGetList, AttributeValuesCreate, AttributeValuesGetInstance,
    AttributeValuesDelete } from '../features/attribute-values';

import { ProductsGetList, ProductsCreate, ProductsGetInstance,
    ProductsUpdate, ProductsDelete } from '../features/products';

import { ProductSKUsGetList, ProductSKUsCreate, ProductSKUsGetInstance,
    ProductSKUsUpdate, ProductSKUsDelete } from '../features/product-skus';

import { StockItemsGetList, StockItemsAdd, StockItemsAddBulk,
    StockItemsUpdateBulk, StockItemsRemove } from '../features/stock-items';

import { UsersGetList, UsersCreate,
    UsersUpdate, UsersDelete } from '../features/users';



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
    {
        title: 'Locations',
        actions: [
            { title: 'Get List', component: LocationsGetList },
            { title: 'Get Tree', component: LocationsGetTree },
            { title: 'Create', component: LocationsCreate },
            // { title: 'Get Instance', component: LocationsGetInstance },
            // { title: 'Update', component: LocationsUpdate },
            { title: 'Delete', component: LocationsDelete },
        ]
    },
    {
        title: 'Categories',
        actions: [
            { title: 'Get List', component: CategoriesGetList },
            { title: 'Get Tree', component: CategoriesGetTree },
            { title: 'Create', component: CategoriesCreate },
            { title: 'Get Instance', component: CategoriesGetInstance },
            { title: 'Get Children', component: CategoriesGetChildren },
            { title: 'Update', component: CategoriesUpdate },
            { title: 'Delete', component: CategoriesDelete },
        ]
    },
    {
        title: 'Attributes',
        actions: [
            { title: 'Get List', component: AttributesGetList },
            { title: 'Get Instance', component: AttributesGetInstance },
            { title: 'Create', component: AttributesCreate },
            { title: 'Delete', component: AttributesDelete },
        ]
    },
    {
        title: 'Attribute Values',
        actions: [
            { title: 'Get List', component: AttributeValuesGetList },
            { title: 'Get Instance', component: AttributeValuesGetInstance },
            { title: 'Create', component: AttributeValuesCreate },
            { title: 'Delete', component: AttributeValuesDelete },
        ],
    },
    {
        title: 'Products',
        actions: [
            { title: 'Get List', component: ProductsGetList },
            { title: 'Create', component: ProductsCreate },
            { title: 'Get Instance', component: ProductsGetInstance },
            { title: 'Update', component: ProductsUpdate },
            { title: 'Delete', component: ProductsDelete },
        ]
    },
    {
        title: 'Product SKUs',
        actions: [
            { title: 'Get List', component: ProductSKUsGetList },
            { title: 'Create', component: ProductSKUsCreate },
            { title: 'Get Instance', component: ProductSKUsGetInstance },
            { title: 'Update', component: ProductSKUsUpdate },
            { title: 'Delete', component: ProductSKUsDelete },
        ]
    },
    {
        title: 'Stock Items',
        actions: [
            { title: 'Get List', component: StockItemsGetList },
            { title: 'Add', component: StockItemsAdd },
            { title: 'Bulk Add', component: StockItemsAddBulk },
            { title: 'Bulk Update', component: StockItemsUpdateBulk },
            { title: 'Remove', component: StockItemsRemove },
        ]
    },
    {
        title: 'Users',
        actions: [
            { title: 'Get List', component: UsersGetList },
            { title: 'Create', component: UsersCreate },
            // { title: 'Get Instance', endpoint: '/' },
            { title: 'Update', component: UsersUpdate },
            { title: 'Delete', component: UsersDelete }
        ]
    },
];

export default menuItems;