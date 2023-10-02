import Button, { ButtonProps }  from '@mui/material/Button';

import { styled } from '@mui/material/styles';

const ButtonText = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'var(--primary-color) !important',
  '&:hover': {
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: 'var(--primary-color-hover) !important'
  }
}))

export default ButtonText;