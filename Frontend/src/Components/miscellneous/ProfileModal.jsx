import { ViewIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label="View profile"
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
          variant="ghost"
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{user?.name || 'Profile'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between" gap={3}>
            {user?.pic && (
              <Image
                src={user.pic}
                alt={user?.name || 'User'}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
              />
            )}
            {user?.email && (
              <Text fontSize="lg" color="gray.600">
               Email: {user.email}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
