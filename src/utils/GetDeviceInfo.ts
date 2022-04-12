import axios from 'axios'
// import Obj from "./Obj";

// API参考：https://ipwhois.io/documentation
const ipURL = 'https://ipwhois.app/json/'

export interface IpInfo {
  ip: string
  success: boolean
  message?: string
  type?: string
  continent?: string
  continent_code?: string
  country?: string
  country_code?: string
  country_capital?: string
  country_phone?: string
  country_neighbours?: string
  region?: string
  city?: string
  latitude?: string
  longitude?: string
  as?: string
  org?: string
  isp?: string
  timezone?: string
  timezone_name?: string
  tytimezone_dstOffsetpe?: string
  timezone_gmtOffset?: string
  timezone_gmt?: string
  currency?: string
  currency_code?: string
  currency_symbol?: string
  currency_rates?: string
  currency_plural?: string
  completed_requests?: string
}

export interface FingerprintInfo {
  user_agent: string
  web_driver: boolean
  time_zone: string
  languages: string
  platform: string
  hardware_concurrency: number
  webgl_vendor: string
  webgl_renderer: string
  headchr_plugins: PluginArray
  selenium_driver: string
  cookie_enable: boolean
  vendor: string
}

export function getIpInfo<T>(ip?: string): Promise<T> {
  if (!ip) {
    ip = ''
  }
  const requestURL = ipURL + ip
  return axios.get<T>(requestURL).then((response) => response.data)
}

export async function getFingerprintInfo(): Promise<FingerprintInfo> {
  // const aa = await axios.head("https://www.google.com")
  const navigator = window.navigator

  const fingerprintInfo: FingerprintInfo = {
    user_agent: navigator.userAgent,
    web_driver: navigator.webdriver,
    time_zone: '',
    languages: navigator.languages.join(','),
    platform: navigator.platform,
    hardware_concurrency: navigator.hardwareConcurrency,
    webgl_vendor: '',
    webgl_renderer: '',
    headchr_plugins: navigator.plugins,
    selenium_driver: '',
    cookie_enable: navigator.cookieEnabled,
    vendor: navigator.vendor,
  }
  return fingerprintInfo
}
