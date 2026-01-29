'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';

const NAV_WIDTH = 360;
const MAIN_WIDTH = 1560;

const navItems = [
  { href: '/', label: 'トップページ' },
  { href: '/password-generator', label: 'パスワード生成器' },
  { href: '/lorem-ipsum', label: 'サンプル文字列（lorem ipsum）生成' },
  { href: '/bmi', label: 'BMI計算' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ナビゲーション部分: 左右幅360px */}
      <Paper
        component="nav"
        elevation={0}
        square
        sx={{
          width: NAV_WIDTH,
          minWidth: NAV_WIDTH,
          flexShrink: 0,
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* メイン部分: 左右幅1560px（1920px表示時） */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: MAIN_WIDTH,
          maxWidth: '100%',
          minHeight: '100vh',
          p: 3,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
