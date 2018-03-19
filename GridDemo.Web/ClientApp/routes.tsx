import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomeComponent from './components/Home';
import CustomerGridComponent from './components/customer/grid';

export const routes = <Layout>
    <Route exact path="/" component={HomeComponent} />
    <Route path="/customer/grid/:pageStartIndex?" component={CustomerGridComponent} />
</Layout>;
