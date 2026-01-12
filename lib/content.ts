import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface ContentItem {
  id: number
  section: string
  key: string
  value: string
  sort_order: number
  created_at: Date
  updated_at: Date
}

export async function getTopMainMenuBranding(): Promise<ContentItem[]> {
  const result = await sql`
    SELECT * FROM site_content 
    WHERE section = 'top_main_menu_branding'
    ORDER BY sort_order ASC
  `
  return result as ContentItem[]
}

export async function getTopMainMenuNavigation(): Promise<ContentItem[]> {
  const result = await sql`
    SELECT * FROM site_content 
    WHERE section = 'top_main_menu_navigation'
    ORDER BY sort_order ASC
  `
  return result as ContentItem[]
}

export async function getTopMainMenuAction(): Promise<ContentItem[]> {
  const result = await sql`
    SELECT * FROM site_content 
    WHERE section = 'top_main_menu_action'
    ORDER BY sort_order ASC
  `
  return result as ContentItem[]
}

export async function getAllContent(section: string): Promise<ContentItem[]> {
  const result = await sql`
    SELECT * FROM site_content 
    WHERE section = ${section}
    ORDER BY sort_order ASC
  `
  return result as ContentItem[]
}

export async function getAllContentGrouped(): Promise<Record<string, ContentItem[]>> {
  const result = await sql`
    SELECT * FROM site_content
    ORDER BY section ASC, sort_order ASC
  `

  const grouped: Record<string, ContentItem[]> = {}
  result.forEach((row: any) => {
    if (!grouped[row.section]) {
      grouped[row.section] = []
    }
    grouped[row.section].push(row as ContentItem)
  })

  return grouped
}

export async function getSetting(key: string): Promise<string | null> {
  const result = await sql`
    SELECT value FROM settings 
    WHERE key = ${key}
    LIMIT 1
  `
  return result.length > 0 ? result[0].value : null
}

export async function getWhatsAppNumber(): Promise<string> {
  const number = await getSetting("whatsapp_number")
  return number || "+964 775 173 5156"
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getServices(): Promise<Service[]> {
  const result = await sql`
    SELECT * FROM services 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as Service[]
}

export async function getAllServices(): Promise<Service[]> {
  const result = await sql`
    SELECT * FROM services 
    ORDER BY sort_order ASC
  `
  return result as Service[]
}

export async function getService(id: number): Promise<Service | null> {
  const result = await sql`
    SELECT * FROM services 
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Service) : null
}

export async function updateService(
  id: number,
  title: string,
  description: string,
  icon: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE services 
    SET title = ${title}, 
        description = ${description}, 
        icon = ${icon},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateServiceOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE services 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteService(id: number): Promise<void> {
  await sql`
    DELETE FROM services WHERE id = ${id}
  `
}

export async function createService(
  title: string,
  description: string,
  icon: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO services (title, description, icon, sort_order)
    VALUES (${title}, ${description}, ${icon}, ${sort_order})
  `
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${value}, CURRENT_TIMESTAMP)
    ON CONFLICT (key) 
    DO UPDATE SET value = ${value}, updated_at = CURRENT_TIMESTAMP
  `
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  button_text: string
  button_link: string | null
  image_url: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const result = await sql`
    SELECT * FROM hero_slides 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as HeroSlide[]
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const result = await sql`
    SELECT * FROM hero_slides 
    ORDER BY sort_order ASC
  `
  return result as HeroSlide[]
}

export async function getHeroSlide(id: number): Promise<HeroSlide | null> {
  const result = await sql`
    SELECT * FROM hero_slides 
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as HeroSlide) : null
}

export async function updateHeroSlide(
  id: number,
  title: string,
  subtitle: string,
  button_text: string,
  button_link: string | null,
  image_url: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE hero_slides 
    SET title = ${title}, 
        subtitle = ${subtitle}, 
        button_text = ${button_text},
        button_link = ${button_link},
        image_url = ${image_url},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateHeroSlideOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE hero_slides 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteHeroSlide(id: number): Promise<void> {
  await sql`
    DELETE FROM hero_slides WHERE id = ${id}
  `
}

export async function createHeroSlide(
  title: string,
  subtitle: string,
  button_text: string,
  button_link: string | null,
  image_url: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO hero_slides (title, subtitle, button_text, button_link, image_url, sort_order)
    VALUES (${title}, ${subtitle}, ${button_text}, ${button_link}, ${image_url}, ${sort_order})
  `
}

export interface AboutContent {
  id: number
  title: string
  description: string
  icon: string // Changed from image_url to icon
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getAboutContent(): Promise<AboutContent[]> {
  const result = await sql`
    SELECT * FROM about_content 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as AboutContent[]
}

export async function getAllAboutContent(): Promise<AboutContent[]> {
  const result = await sql`
    SELECT * FROM about_content 
    ORDER BY sort_order ASC
  `
  return result as AboutContent[]
}

export async function updateAboutContent(
  id: number,
  title: string,
  description: string,
  icon: string, // Changed from image_url to icon
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE about_content 
    SET title = ${title}, 
        description = ${description}, 
        icon = ${icon},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateAboutContentOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE about_content 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteAboutContent(id: number): Promise<void> {
  await sql`
    DELETE FROM about_content WHERE id = ${id}
  `
}

export async function createAboutContent(
  title: string,
  description: string,
  icon: string, // Changed from image_url to icon
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO about_content (title, description, icon, sort_order)
    VALUES (${title}, ${description}, ${icon}, ${sort_order})
  `
}

export interface Package {
  id: number
  name: string
  speed: string
  price: number
  currency: string
  features: string // JSON array stored as text
  is_featured: boolean
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getPackages(): Promise<Package[]> {
  const result = await sql`
    SELECT * FROM packages 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as Package[]
}

export async function getAllPackages(): Promise<Package[]> {
  const result = await sql`
    SELECT * FROM packages 
    ORDER BY sort_order ASC
  `
  return result as Package[]
}

export async function updatePackage(
  id: number,
  name: string,
  speed: string,
  price: number,
  currency: string,
  features: string,
  is_featured: boolean,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE packages 
    SET name = ${name}, 
        speed = ${speed}, 
        price = ${price},
        currency = ${currency},
        features = ${features},
        is_featured = ${is_featured},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updatePackageOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE packages 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deletePackage(id: number): Promise<void> {
  await sql`
    DELETE FROM packages WHERE id = ${id}
  `
}

export async function createPackage(
  name: string,
  speed: string,
  price: number,
  currency: string,
  features: string,
  is_featured: boolean,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO packages (name, speed, price, currency, features, is_featured, sort_order)
    VALUES (${name}, ${speed}, ${price}, ${currency}, ${features}, ${is_featured}, ${sort_order})
  `
}

export interface ContactInfo {
  id: number
  type: string
  label: string
  value: string
  icon: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getContactInfo(): Promise<ContactInfo[]> {
  const result = await sql`
    SELECT * FROM contact_info 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as ContactInfo[]
}

export async function getAllContactInfo(): Promise<ContactInfo[]> {
  const result = await sql`
    SELECT * FROM contact_info 
    ORDER BY sort_order ASC
  `
  return result as ContactInfo[]
}

export async function updateContactInfo(
  id: number,
  type: string,
  label: string,
  value: string,
  icon: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE contact_info 
    SET type = ${type}, 
        label = ${label}, 
        value = ${value},
        icon = ${icon},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateContactInfoOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE contact_info 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteContactInfo(id: number): Promise<void> {
  await sql`
    DELETE FROM contact_info WHERE id = ${id}
  `
}

export async function createContactInfo(
  type: string,
  label: string,
  value: string,
  icon: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO contact_info (type, label, value, icon, sort_order)
    VALUES (${type}, ${label}, ${value}, ${icon}, ${sort_order})
  `
}

export interface FooterLink {
  id: number
  title: string
  url: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface FooterSocial {
  id: number
  platform: string
  url: string
  icon: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getFooterLinks(): Promise<FooterLink[]> {
  const result = await sql`
    SELECT * FROM footer_links 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as FooterLink[]
}

export async function getAllFooterLinks(): Promise<FooterLink[]> {
  const result = await sql`
    SELECT * FROM footer_links 
    ORDER BY sort_order ASC
  `
  return result as FooterLink[]
}

export async function updateFooterLink(id: number, title: string, url: string, is_active: boolean): Promise<void> {
  await sql`
    UPDATE footer_links 
    SET title = ${title}, 
        url = ${url},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateFooterLinkOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE footer_links 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteFooterLink(id: number): Promise<void> {
  await sql`
    DELETE FROM footer_links WHERE id = ${id}
  `
}

export async function createFooterLink(title: string, url: string, sort_order: number): Promise<void> {
  await sql`
    INSERT INTO footer_links (title, url, sort_order)
    VALUES (${title}, ${url}, ${sort_order})
  `
}

export async function getFooterSocial(): Promise<FooterSocial[]> {
  const result = await sql`
    SELECT * FROM footer_social 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as FooterSocial[]
}

export async function getAllFooterSocial(): Promise<FooterSocial[]> {
  const result = await sql`
    SELECT * FROM footer_social 
    ORDER BY sort_order ASC
  `
  return result as FooterSocial[]
}

export async function updateFooterSocial(
  id: number,
  platform: string,
  url: string,
  icon: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE footer_social 
    SET platform = ${platform}, 
        url = ${url},
        icon = ${icon},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateFooterSocialOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE footer_social 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteFooterSocial(id: number): Promise<void> {
  await sql`
    DELETE FROM footer_social WHERE id = ${id}
  `
}

export async function createFooterSocial(
  platform: string,
  url: string,
  icon: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO footer_social (platform, url, icon, sort_order)
    VALUES (${platform}, ${url}, ${icon}, ${sort_order})
  `
}

export interface PackagesHero {
  id: number
  badge_text: string
  title: string
  description: string
  button1_text: string
  button1_link: string
  button2_text: string
  button2_link: string
  background_image: string | null
  created_at: Date
  updated_at: Date
}

export interface PackagesStat {
  id: number
  icon: string
  value: string
  label: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getPackagesHero(): Promise<PackagesHero | null> {
  const result = await sql`
    SELECT * FROM packages_hero 
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as PackagesHero) : null
}

export async function updatePackagesHero(
  id: number,
  badge_text: string,
  title: string,
  description: string,
  button1_text: string,
  button1_link: string,
  button2_text: string,
  button2_link: string,
  background_image: string | null,
): Promise<void> {
  await sql`
    UPDATE packages_hero 
    SET badge_text = ${badge_text},
        title = ${title},
        description = ${description},
        button1_text = ${button1_text},
        button1_link = ${button1_link},
        button2_text = ${button2_text},
        button2_link = ${button2_link},
        background_image = ${background_image},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function getPackagesStats(): Promise<PackagesStat[]> {
  const result = await sql`
    SELECT * FROM packages_stats 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as PackagesStat[]
}

export async function getAllPackagesStats(): Promise<PackagesStat[]> {
  const result = await sql`
    SELECT * FROM packages_stats 
    ORDER BY sort_order ASC
  `
  return result as PackagesStat[]
}

export async function updatePackagesStat(
  id: number,
  icon: string,
  value: string,
  label: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE packages_stats 
    SET icon = ${icon},
        value = ${value},
        label = ${label},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updatePackagesStatOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE packages_stats 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deletePackagesStat(id: number): Promise<void> {
  await sql`
    DELETE FROM packages_stats WHERE id = ${id}
  `
}

export async function createPackagesStat(
  icon: string,
  value: string,
  label: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO packages_stats (icon, value, label, sort_order)
    VALUES (${icon}, ${value}, ${label}, ${sort_order})
  `
}

export interface WhyChooseFeature {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getWhyChooseFeatures(): Promise<WhyChooseFeature[]> {
  const result = await sql`
    SELECT * FROM why_choose_features 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as WhyChooseFeature[]
}

export async function getAllWhyChooseFeatures(): Promise<WhyChooseFeature[]> {
  const result = await sql`
    SELECT * FROM why_choose_features 
    ORDER BY sort_order ASC
  `
  return result as WhyChooseFeature[]
}

export async function updateWhyChooseFeature(
  id: number,
  icon: string,
  title: string,
  description: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE why_choose_features 
    SET icon = ${icon},
        title = ${title},
        description = ${description},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateWhyChooseFeatureOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE why_choose_features 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteWhyChooseFeature(id: number): Promise<void> {
  await sql`
    DELETE FROM why_choose_features WHERE id = ${id}
  `
}

export async function createWhyChooseFeature(
  icon: string,
  title: string,
  description: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO why_choose_features (icon, title, description, sort_order)
    VALUES (${icon}, ${title}, ${description}, ${sort_order})
  `
}

export interface WhyChooseSection {
  id: number
  section_title: string
  updated_at: Date
}

export async function getWhyChooseSection(): Promise<WhyChooseSection | null> {
  const result = await sql`
    SELECT * FROM why_choose_section 
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as WhyChooseSection) : null
}

export async function updateWhyChooseSection(id: number, section_title: string): Promise<void> {
  await sql`
    UPDATE why_choose_section 
    SET section_title = ${section_title},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export interface ContactPageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  description: string
  background_image: string | null
  created_at: Date
  updated_at: Date
}

export interface ContactPageFeature {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getContactPageHero(): Promise<ContactPageHero | null> {
  const result = await sql`
    SELECT * FROM contact_page_hero 
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as ContactPageHero) : null
}

export async function updateContactPageHero(
  id: number,
  badge_text: string,
  title: string,
  subtitle: string,
  description: string,
  background_image: string | null,
): Promise<void> {
  await sql`
    UPDATE contact_page_hero 
    SET badge_text = ${badge_text},
        title = ${title},
        subtitle = ${subtitle},
        description = ${description},
        background_image = ${background_image},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function getContactPageFeatures(): Promise<ContactPageFeature[]> {
  const result = await sql`
    SELECT * FROM contact_page_features 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as ContactPageFeature[]
}

export async function getAllContactPageFeatures(): Promise<ContactPageFeature[]> {
  const result = await sql`
    SELECT * FROM contact_page_features 
    ORDER BY sort_order ASC
  `
  return result as ContactPageFeature[]
}

export async function updateContactPageFeature(
  id: number,
  icon: string,
  title: string,
  description: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE contact_page_features 
    SET icon = ${icon},
        title = ${title},
        description = ${description},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateContactPageFeatureOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE contact_page_features 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteContactPageFeature(id: number): Promise<void> {
  await sql`
    DELETE FROM contact_page_features WHERE id = ${id}
  `
}

export async function createContactPageFeature(
  icon: string,
  title: string,
  description: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO contact_page_features (icon, title, description, sort_order)
    VALUES (${icon}, ${title}, ${description}, ${sort_order})
  `
}

export interface AboutPageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  description: string
  button1_text: string
  button1_link: string
  background_image_url: string | null
  created_at: Date
  updated_at: Date
}

export async function getAboutPageHero(): Promise<AboutPageHero | null> {
  const result = await sql`
    SELECT * FROM about_page_hero LIMIT 1
  `
  return result[0] as AboutPageHero | null
}

export async function updateAboutPageHero(data: {
  badge_text: string
  title: string
  subtitle: string
  description: string
  button1_text: string
  button1_link: string
  background_image_url: string | null
}): Promise<void> {
  await sql`
    UPDATE about_page_hero 
    SET 
      badge_text = ${data.badge_text},
      title = ${data.title},
      subtitle = ${data.subtitle},
      description = ${data.description},
      button1_text = ${data.button1_text},
      button1_link = ${data.button1_link},
      background_image_url = ${data.background_image_url},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `
}

export interface AboutPageStat {
  id: number
  icon: string
  value: string
  label: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getAboutPageStats(): Promise<AboutPageStat[]> {
  const result = await sql`
    SELECT * FROM about_page_stats 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as AboutPageStat[]
}

export async function getAllAboutPageStats(): Promise<AboutPageStat[]> {
  const result = await sql`
    SELECT * FROM about_page_stats 
    ORDER BY sort_order ASC
  `
  return result as AboutPageStat[]
}

export async function createAboutPageStat(
  icon: string,
  value: string,
  label: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO about_page_stats (icon, value, label, sort_order)
    VALUES (${icon}, ${value}, ${label}, ${sort_order})
  `
}

export async function updateAboutPageStat(
  id: number,
  icon: string,
  value: string,
  label: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE about_page_stats 
    SET 
      icon = ${icon},
      value = ${value},
      label = ${label},
      is_active = ${is_active},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateAboutPageStatOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE about_page_stats 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteAboutPageStat(id: number): Promise<void> {
  await sql`
    DELETE FROM about_page_stats WHERE id = ${id}
  `
}

export interface CoveragePageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  description: string
  button_text: string
  button_link: string
  background_image: string | null
}

export interface CoverageArea {
  id: number
  name: string
  status: string
  tower_count: number
  icon: string
  sort_order: number
}

export interface CoverageMapSection {
  id: number
  map_image: string | null
}

export async function getCoveragePageHero(): Promise<CoveragePageHero | null> {
  const result = await sql`SELECT * FROM coverage_page_hero LIMIT 1`
  return result.length > 0 ? (result[0] as CoveragePageHero) : null
}

export async function updateCoveragePageHero(data: Partial<CoveragePageHero>): Promise<void> {
  await sql`
    UPDATE coverage_page_hero
    SET 
      badge_text = ${data.badge_text},
      title = ${data.title},
      subtitle = ${data.subtitle},
      description = ${data.description},
      button_text = ${data.button_text},
      button_link = ${data.button_link},
      background_image = ${data.background_image},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `
}

export async function getCoverageAreas(): Promise<CoverageArea[]> {
  const result = await sql`
    SELECT * FROM coverage_areas
    ORDER BY sort_order ASC
  `
  return result as CoverageArea[]
}

export async function createCoverageArea(data: Partial<CoverageArea>): Promise<void> {
  const maxOrder = await sql`SELECT COALESCE(MAX(sort_order), -1) as max FROM coverage_areas`
  const nextOrder = (maxOrder[0]?.max || 0) + 1

  await sql`
    INSERT INTO coverage_areas (name, status, tower_count, icon, sort_order)
    VALUES (${data.name}, ${data.status}, ${data.tower_count}, ${data.icon || "map-pin"}, ${nextOrder})
  `
}

export async function updateCoverageArea(id: number, data: Partial<CoverageArea>): Promise<void> {
  await sql`
    UPDATE coverage_areas
    SET 
      name = ${data.name},
      status = ${data.status},
      tower_count = ${data.tower_count},
      icon = ${data.icon},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteCoverageArea(id: number): Promise<void> {
  await sql`DELETE FROM coverage_areas WHERE id = ${id}`
}

export async function reorderCoverageAreas(id: number, direction: "up" | "down"): Promise<void> {
  const items = await getCoverageAreas()
  const currentIndex = items.findIndex((item) => item.id === id)

  if (currentIndex === -1) return

  const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
  if (newIndex < 0 || newIndex >= items.length) return

  const currentItem = items[currentIndex]
  const swapItem = items[newIndex]

  await sql`UPDATE coverage_areas SET sort_order = ${swapItem.sort_order} WHERE id = ${currentItem.id}`
  await sql`UPDATE coverage_areas SET sort_order = ${currentItem.sort_order} WHERE id = ${swapItem.id}`
}

export async function getCoverageMapSection(): Promise<CoverageMapSection | null> {
  const result = await sql`SELECT * FROM coverage_map_section LIMIT 1`
  return result.length > 0 ? (result[0] as CoverageMapSection) : null
}

export async function updateCoverageMapSection(mapImage: string | null): Promise<void> {
  await sql`
    UPDATE coverage_map_section
    SET 
      map_image = ${mapImage},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `
}
