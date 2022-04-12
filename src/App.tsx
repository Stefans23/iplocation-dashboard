import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { FingerprintInfo, getFingerprintInfo, getIpInfo, IpInfo } from './utils/GetDeviceInfo'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Paper, Skeleton, Stack, styled, Typography } from '@mui/material'

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

interface NavigateData {
  name: string
  url: string
  icon?: string
  target: string
}

function App() {
  const [ipAddress, setIpAddress] = useState<string>()
  const [ipInfo, setIpInfo] = useState<IpInfo>()
  const [fingerprintInfo, setFingerprintInfo] = useState<FingerprintInfo>()
  const navigateDatas: NavigateData[] = [
    { name: 'Gmail', url: 'https://gmail.com', icon: 'assets/icons/gmail_icon.png', target: '_blank' },
    { name: 'Coinlist', url: 'https://www.coinlist.co', icon: 'assets/icons/coinlist_icon.png', target: '_blank' },
  ]
  // 获取IP地址信息
  useEffect(() => {
    getIpInfo<IpInfo>().then((data) => {
      if (data.success === true) {
        setIpInfo(data)
      }
      setIpAddress(data.ip)
    })
  }, [])

  // 获取设备信息
  useEffect(() => {
    getFingerprintInfo().then((data: FingerprintInfo) => {
      setFingerprintInfo(data)
    })
  }, [])

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 1,
          pb: 0,
          // border: '1px dashed grey',
        }}
      >
        {ipAddress || ipInfo ? (
          <Container maxWidth="lg">
            <Stack>
              <Typography
                component="h2"
                variant="h2"
                align="center"
                color="text.primary"
                // gutterBottom
              >
                {ipAddress}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" align="center" color="text.secondary" marginTop={0}>
                {ipInfo ? (
                  <>
                    {ipInfo.city}, {ipInfo.region}, {ipInfo.country}{' '}
                  </>
                ) : null}
              </Typography>
            </Stack>

            <>
              {ipInfo ? (
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  // spacing={{ xs: 1, sm: 2, md: 4 }}
                  spacing={2}
                  alignContent="center"
                >
                  <Typography variant="body2" gutterBottom>
                    <>
                      {ipInfo.timezone_name}(<b>{ipInfo.timezone_gmt}</b>){'     '}
                    </>
                    <>
                      Country Code: <b>{ipInfo.country_code}</b>
                      {'     '}
                    </>
                    <>
                      Currency: <b>{ipInfo.currency_code}</b>
                      {'     '}
                    </>
                    <>
                      Phone Code: <b>{ipInfo.country_phone}</b>
                      {'     '}
                    </>
                  </Typography>
                </Stack>
              ) : null}
            </>
            <>
              {fingerprintInfo ? (
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  // spacing={{ xs: 6, sm: 6, md: 8 }}
                  spacing={2}
                >
                  <>{fingerprintInfo.user_agent}</>
                  <>{fingerprintInfo.platform}</>
                </Stack>
              ) : null}
            </>
          </Container>
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={151}>
            {/* <Container /> */}
          </Skeleton>
        )}
      </Box>
      <Stack direction="row" spacing={2} alignContent="center" sx={{ margin: '16px 0px 0px 100px' }}>
        {navigateDatas.map((item, index) => (
          <Card sx={{ maxWidth: 168 }} key={index}>
            <Button size="small" color="primary" href={item.url} target={item.target}>
              <CardActionArea>
                <CardMedia component="img" width={168} height="168" image={item.icon} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" height={16} align="center">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Button>
          </Card>
        ))}
      </Stack>
    </>
  )
}

export default App
