import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCoverageAreas, getCoverageMapSection, getCoveragePageHero } from "@/lib/content"
import { ArrowLeft, ArrowRight, MapPin, Radio } from "lucide-react"
import Link from "next/link"

export default async function CoveragePage() {
    const hero = await getCoveragePageHero()
    const areas = await getCoverageAreas()
    const mapSection = await getCoverageMapSection()

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-cyan-900 text-white pt-32 pb-24 px-4">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-cyan-500/20 text-cyan-100 border-cyan-400/30 hover:bg-cyan-500/30 backdrop-blur-sm"
                    >
                        <Radio className="w-4 h-4 ml-2" />
                        {hero?.badge_text || "منطقة التغطية"}
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-lg">
                        {hero?.title || "تغطية شاملة في منطقتك"}
                    </h1>

                    <p className="text-xl md:text-2xl text-cyan-100 mb-6 text-balance drop-shadow">
                        {hero?.subtitle || "نصل إليك أينما كنت في درعا الريف الغربي"}
                    </p>

                    <p className="text-lg text-cyan-50/90 max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
                        {hero?.description ||
                            "نوفر تغطية إنترنت عالية الجودة في جميع أنحاء المنطقة. تحقق من توفر الخدمة في منطقتك واستمتع بإنترنت سريع ومستقر."}
                    </p>

                    <div className="flex justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-slate-900 hover:bg-cyan-50 rounded-2xl px-8 py-6 text-lg font-bold"
                        >
                            <Link className="flex items-center gap-2" href={hero?.button_link || "/contact"}>
                                {hero?.button_text || "تواصل معنا"}
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Coverage Map Section */}
            <section className="py-12 px-4 bg-linear-to-b from-gray-50 via-white to-cyan-50/30">
                <div className="container mx-auto max-w-6xl">
                    {/* Map Image */}
                    {mapSection?.map_image && (
                        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-200/50 backdrop-blur-sm">
                            <img src={"/coverage.png"} alt="خريطة التغطية" className="w-full h-auto" />
                        </div>
                    )}

                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">المناطق المشمولة بالخدمة</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">نقدم خدماتنا في المناطق التالية مع توسع مستمر</p>
                    </div>

                    {/* Coverage Areas Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areas.map((area) => (
                            <div
                                key={area.id}
                                className="group bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">{area.name}</h3>
                                    </div>

                                    <Badge
                                        variant={area.status === "available" ? "default" : "secondary"}
                                        className={
                                            area.status === "available"
                                                ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md"
                                                : "bg-linear-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-md"
                                        }
                                    >
                                        {area.status === "available" ? "متاح" : "قريباً"}
                                    </Badge>
                                </div>

                                {area.status === "available" && (
                                    <div className="flex items-center gap-2 text-gray-600 bg-cyan-50 rounded-xl p-3">
                                        <Radio className="w-5 h-5 text-cyan-600" />
                                        <span className="text-sm font-medium">عدد الأبراج: {area.tower_count}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
