import { Box, Typography, Paper } from '@mui/material';

export default function BMIPage() {
  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        BMI計算
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          この機能は未実装です。
        </Typography>
      </Paper>
    </Box>
  );
}
