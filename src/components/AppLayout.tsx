import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { SettingsModal } from "./SettingsModal";
import { auth } from "../firebaseApp";
import { signOut } from "firebase/auth";

import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: VFC<AppLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Stack h="100vh">
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>Chrono Trigger</Heading>
            {user ? (
              <HStack>
                <Button onClick={onOpen}>設定</Button>
                <div>{user.email}</div>
                <Button
                  onClick={async () => {
                    await signOut(auth);
                  }}
                >
                  Logout
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Button onClick={onOpen}>設定</Button>
                <Button onClick={() => signInWithGoogle()}>Login</Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>
      <Center>{children}</Center>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
