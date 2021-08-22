import React from 'react';
import './NavBar.scss';
import {
  TabsClassicGroup,
  TabsClassicItem,
} from '@design-system-rt/rtk-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeLeftTab as changeLeftTabAction,
  changeRightTab as changeRightTabAction,
} from '../../store/actions/action';

const Navbar = () => {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const changeLeftTab = (e) => {
    const leftTab = e;
    dispatch(changeLeftTabAction({ leftTab: leftTab }));
  };

  const changeRightTab = (e) => {
    const rightTab = e;
    dispatch(changeRightTabAction({ rightTab: rightTab }));
  };

  return (
    <div className="navbar">
      <TabsClassicGroup
        accentColor="primary1"
        onChange={changeLeftTab}
        value={state.leftTab}
        className="navbar-tabs"
        size="small"
      >
        <TabsClassicItem index="0" label="Текст" />
        <TabsClassicItem index="1" label="Компоненты" />
        <TabsClassicItem index="2" label="Иконки" />
      </TabsClassicGroup>

      <TabsClassicGroup
        accentColor="primary1"
        onChange={changeRightTab}
        value={state.rightTab}
        className="navbar-tabs"
        size="small"
      >
        <TabsClassicItem index="0" label="Холст" />
        <TabsClassicItem index="1" label="Настройки" />
      </TabsClassicGroup>
    </div>
  );
};

export default Navbar;
