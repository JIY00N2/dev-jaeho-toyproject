import {
  Flex,
  IconButton,
  Tab,
  TabList,
  Tabs,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <Flex justifyContent={'space-around'}>
      <Tabs>
        <TabList>
          <Tab as={Link} to="/home">
            Google Map
          </Tab>
          <Tab as={Link} to="/infinitescroll">
            무한 스크롤
          </Tab>
          <Tab as={Link} to="/todo">
            Three
          </Tab>
          <IconButton
            aria-label="toggleDarkMode dark mode"
            onClick={toggleColorMode}
            icon={<Icon />}
            variant={'ghost'}
          />
        </TabList>
      </Tabs>
    </Flex>
  );
};
export default Header;
