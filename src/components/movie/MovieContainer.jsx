
import React from 'react'

//  路由 相关组件
import {Link, Route, Switch} from 'react-router-dom'


//布局  导入antd 组件
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;

//导入 电影列表 组件
import MovieList from './MovieList.jsx'
//导入电影详情组件
import MovieDetail from './MovieDetail.jsx'



export default class MovieContainer extends React.Component {
     constructor(props) {
         super(props)
         this.state = {}
     }

     render(){
         return( <Layout style={{height: '100%'}}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                style={{ height: '100%', borderRight: 0 }}
              >
                  <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
                  <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                  <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ paddingLeft: '1px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 10,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Switch>
                   <Route exact path = "/movie/detail/:id" component = {MovieDetail}></Route>
                   <Route exact path="/movie/:type/:page" component={MovieList}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>)
     }
}