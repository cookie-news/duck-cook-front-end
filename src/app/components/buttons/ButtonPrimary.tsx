import Button, { ButtonProps }  from '@mui/material/Button';

import { styled } from '@mui/material/styles';

const ButtonPrimary = styled(Button)<ButtonProps>(({ theme }) => ({
    color: 'white',
    backgroundColor: 'var(--primary-color) !important',
    borderColor: 'var(--primary-color) !important',
    '&:hover': {
      backgroundColor: 'var(--primary-color-hover) !important',
      borderColor: 'var(--primary-color-hover) !important'
    },
}))

export default ButtonPrimary;