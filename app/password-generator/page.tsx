'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
  Button,
  TextField,
  Stack,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';

function generatePassword(
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    underscore: boolean;
    hyphen: boolean;
    length: number;
  }
): string {
  let charset = '';
  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.underscore) charset += '_';
  if (options.hyphen) charset += '-';

  if (charset.length === 0) return '';

  let result = '';
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);
  for (let i = 0; i < options.length; i++) {
    result += charset[array[i] % charset.length];
  }
  return result;
}

export default function PasswordGeneratorPage() {
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [underscore, setUnderscore] = useState(false);
  const [hyphen, setHyphen] = useState(false);
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const options = {
      uppercase,
      lowercase,
      numbers,
      underscore,
      hyphen,
      length,
    };
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generatePassword(options));
    }
    setPasswords(list);
  }, [uppercase, lowercase, numbers, underscore, hyphen, length, count]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ maxWidth: 720 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        パスワード生成器
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        パスワードに使用できるランダムな文字列を生成します。
        下のスイッチやスライダーを操作することで、生成する文字列を調整することができます。
        生成はブラウザ上でのみ行われ、生成した文字列がどこかに保存されることはありません。
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={uppercase}
              onChange={(_, v) => setUppercase(v)}
              color="primary"
            />
          }
          label="大文字のアルファベットの使用"
        />
        <FormControlLabel
          control={
            <Switch
              checked={lowercase}
              onChange={(_, v) => setLowercase(v)}
              color="primary"
            />
          }
          label="小文字のアルファベットの使用"
        />
        <FormControlLabel
          control={
            <Switch
              checked={numbers}
              onChange={(_, v) => setNumbers(v)}
              color="primary"
            />
          }
          label="数字"
        />
        <FormControlLabel
          control={
            <Switch
              checked={underscore}
              onChange={(_, v) => setUnderscore(v)}
              color="primary"
            />
          }
          label="アンダースコア"
        />
        <FormControlLabel
          control={
            <Switch
              checked={hyphen}
              onChange={(_, v) => setHyphen(v)}
              color="primary"
            />
          }
          label="ハイフン"
        />

        <Typography gutterBottom>文字数: {length}</Typography>
        <Slider
          value={length}
          min={4}
          max={50}
          valueLabelDisplay="auto"
          onChange={(_, v) => setLength(v as number)}
        />

        <Typography gutterBottom>生成数: {count}</Typography>
        <Slider
          value={count}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
          marks
          onChange={(_, v) => setCount(v as number)}
        />

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={
            !uppercase && !lowercase && !numbers && !underscore && !hyphen
          }
        >
          生成
        </Button>
      </Stack>

      {passwords.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            生成された文字列
          </Typography>
          <Stack spacing={1}>
            {passwords.map((pwd, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  value={pwd}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(pwd)}
                >
                  コピー
                </Button>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
