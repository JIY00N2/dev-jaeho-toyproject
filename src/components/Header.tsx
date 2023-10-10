import {
  Flex,
  IconButton,
  Spacer,
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
    <Flex alignItems="center" gap="2" pl="2" pr="2">
      <Tabs>
        <TabList gap="2">
          <Tab as={Link} to="/home">
            Google Map
          </Tab>
          <Tab as={Link} to="/infinitescroll">
            무한 스크롤
          </Tab>
          <Tab as={Link} to="/todo">
            ToDo
          </Tab>
        </TabList>
      </Tabs>
      <Spacer />
      <IconButton
        aria-label="toggleDarkMode dark mode"
        onClick={toggleColorMode}
        icon={<Icon />}
        variant={'ghost'}
      />
    </Flex>
  );
};
export default Header;
