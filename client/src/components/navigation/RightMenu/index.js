import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
const { SubMenu, MenuItemGroup, Item } = Menu

function RightMenu() {
  return (
    <>
      <Menu mode="horizontal">
        <Item key="mail">
          <a href="">Signin</a>
        </Item>
        <Item key="app">
          <a href="">Signup</a>
        </Item>
      </Menu>
    </>
  )
}
export default RightMenu
