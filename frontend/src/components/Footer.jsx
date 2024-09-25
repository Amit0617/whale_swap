import { Box, Text, Link, Stack } from '@chakra-ui/react'

function Footer() {
  return (
    <Box bg="gray.900" color="gray.200" py={4}>
      <Stack align="center">
        <Text fontSize="sm">© 2024 WhaleSwap. All Rights Reserved.</Text>
        <Stack direction="row" spacing={6}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">FAQ</Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
