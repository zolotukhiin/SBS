import React from 'react'
import { NavButton } from '../nav-button'
import { BsBox, BsHouse } from 'react-icons/bs';
import { FiUser, FiStar, FiRepeat } from 'react-icons/fi';

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href='/' icon={<BsHouse />}>
            Главная
          </NavButton>
        </li>
        <li>
          <NavButton href='/items' icon={<BsBox />}>
            Предметы
          </NavButton>
        </li>
        <li>
          <NavButton href='/offers' icon={<FiStar />}>
            Предложения
          </NavButton>
        </li>
        <li>
          <NavButton href='/exchanges' icon={<FiRepeat />}>
            Обмены
          </NavButton>
        </li>
        <li>
          <NavButton href='/user-profile' icon={<FiUser />}>
            Мой профиль
          </NavButton>
        </li>
      </ul>
    </nav>
  )
};