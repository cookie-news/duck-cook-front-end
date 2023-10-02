import Button, { ButtonProps }  from '@mui/material/Button';

import { styled } from '@mui/material/styles';

const ButtonSecondary = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'var(--primary-color) !important',
  borderColor: 'var(--primary-color) !important',
  '&:hover': {
    backgroundColor: 'var(--primary-color-hover) !important',
    borderColor: 'var(--primary-color-hover) !important',
    color: 'white !important'
  },
}))

export default ButtonSecondary;