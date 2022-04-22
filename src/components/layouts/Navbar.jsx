import styles from './styles/navbar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRef, useState} from 'react';
import {Menu} from '../../constants/menu';
import useOnClickOutSide from '../../hooks/useClickOutSide';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar () {
  const [showSideBar, setShowSideBar] = useState(false);
  const ref = useRef();
  const router = useRouter();

  useOnClickOutSide(ref, () => setShowSideBar(false));

  return(
    <div className={ `${styles.navbar} w-full` }>
      <div className={ `${styles.container} w-auto flex justify-between px-4 md:px-8 xl:px-12` }>
        <div className='md:hidden flex items-center'>
          <span className='cursor-pointer text-gray-200 hover:text-white'
            onClick={ () => setShowSideBar(!showSideBar) }>
            <FontAwesomeIcon icon='bars' size='2x'/>
          </span>
          <div className={ `w-screen h-screen fixed top-0 left-0 flex ${showSideBar ? '' : 'hidden'} ${styles.menu_mobile}` } >
            <div className={ `h-full bg-gray-100 ${showSideBar ? styles.sideBar : 'w-0'} ` } ref={ ref }>
              <div className="flex border-b pb-6 px-4 pt-12 items-center font-12">
                <input
                  className='border px-3 py-1.5 focus:outline-none text-gray-500 focus:border-gray-400 rounded-sm'
                  placeholder='Tìm kiếm...'
                  style={ {width: '190px'} }
                />
                <div className='w-10 h-10 flex items-center justify-center text-white bg-gray-600 hover:bg-gray-700 cursor-pointer'>
                  <FontAwesomeIcon icon='search' size='lg' />
                </div>
              </div>
              {
                Menu.map(item => {
                  return(
                    <Link key={ item.id } href={ item.path }>
                      <a>
                        <div className='text-gray-500 p-4 border-b font-bold hover:text-gray-600 hover:bg-gray-200'
                          onClick={ () => setShowSideBar(false) }>
                          {item.title}
                        </div>
                      </a>
                    </Link>
                  );
                })
              }
            </div>
            <div className={ `${styles.background} h-full relative` }>
              <span className='text-gray-200 hover:text-white absolute top-4 right-4 cursor-pointer'>
                <FontAwesomeIcon icon='times' size='2x' />
              </span>
            </div>
          </div>
        </div>
        <Image
          src='/assets/images/mitsubishi_logo.jpg'
          alt="Picture of the author"
          height={ 70 }
          width={ 70 }
        />
        <ul className='flex-row items-center hidden md:flex'>
          {
            Menu.map(item => {
              return(
                <Link key={ item.id } href={ item.path }>
                  <a>
                    <li className={ `ml-6 text-sm md:text-md xl:text-lg text-gray-200 hover:text-white uppercase ${router.pathname === item.path ? 'font-bold text-white' : ''}` }>
                      {item.title}
                    </li>
                  </a>
                </Link>
              );
            })
          }
        </ul>

      </div>
    </div>
  );
}