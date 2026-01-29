import { Box, Typography, Paper } from '@mui/material';

export default function LoremIpsumPage() {
  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        サンプル文字列（lorem ipsum）生成
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          この機能は未実装です。
        </Typography>
      </Paper>
    </Box>
  );
}
