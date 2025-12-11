export interface Drive {
  driveId: string;
  title: string;
  organization: string;
  description: string;
  currentAmount: number;
  targetAmount?: number;
  imageUrl: string;
  endDate?: string;
  gallery?: string[];
}

export const allDrives: Drive[] = [
  {
    driveId: "1",
    title: "School Books for 100 Kids",
    organization: "School of Hope",
    description:
      "The School Books for 100 Kids campaign is dedicated to ensuring that underprivileged children have equal access to educational materials. Many families in our community are unable to afford basic resources like textbooks, notebooks, and writing supplies. Through the concerted efforts of the School of Hope and generous donors, we plan to provide comprehensive book kits including age-appropriate reading material, stationery, and activity resources to one hundred students in need. This will not only help these children keep pace with their peers academically, but it will also foster a love of learning and boost their self-confidence. Your support will directly impact the future of these children, opening doors to new possibilities and a brighter future. Every contribution brings us closer to making education accessible for all, enabling these young minds to thrive both inside and outside the classroom.",
    currentAmount: 4500,
    targetAmount: 6000,
    imageUrl: "/images/sample.png",
    endDate: "Dec 20, 2025",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
      "/images/sample.png",
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "2",
    title: "Clean Water Initiative",
    organization: "Water for Life",
    description:
      "The Clean Water Initiative by Water for Life seeks to provide safe, clean drinking water to communities that currently lack reliable access. Contaminated water sources pose a constant threat to health, particularly for children and the elderly, resulting in waterborne diseases and long-term health problems. Through this project, we will install modern filtration systems and organize community workshops on safe water practices. Funds raised will go toward purchasing filtration units, transporting materials to remote areas, and training local leaders to maintain these systems. Every donation helps decrease illness, improve sanitation, and empower people to live healthier lives. Clean water is fundamental to dignity and well-being, so your contributions play a vital role in transforming lives and building a healthier, more resilient community for generations to come.",
    currentAmount: 3200,
    targetAmount: 5000,
    imageUrl: "/images/sample.png",
    endDate: "Jan 15, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "3",
    title: "Emergency Food Relief",
    organization: "Food for All",
    description:
      "Emergency Food Relief is an urgent campaign to support families experiencing hunger or food insecurity due to loss of income, natural disasters, or unexpected hardships. Food for All is committed to delivering nutritious food packages that include staples such as rice, beans, grains, oil, and canned goods tailored to different dietary requirements. The drive also provides fresh produce where possible, ensuring that recipients get balanced nutrition. In addition to providing immediate relief, our program connects families to long-term resources such as food pantries and nutrition education. Your donation helps ensure no one goes to bed hungry, especially vulnerable children and elderly individuals. Together, we can bring hope and sustenance to our neighbors in need and help them get back on their feet with dignity and care.",
    currentAmount: 9800,
    targetAmount: 10000,
    imageUrl: "/images/sample.png",
    endDate: "Feb 28, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "4",
    title: "Medical Supplies for Rural Clinics",
    organization: "Medical Supplies for Rural Clinics",
    description:
      "This drive is focused on delivering critical medical supplies and equipment to rural health centers that face severe shortages. Many remote clinics operate without basic essentials such as bandages, sterile gloves, antibiotics, and diagnostic tools, leaving them unable to provide adequate care. With your support, we will assemble and distribute medical kits tailored to the needs of each clinic, offer additional training for local healthcare workers, and establish a supply network for ongoing support. These efforts will help clinics respond more effectively to emergencies, reduce preventable diseases, and save countless lives. Your contribution ensures that even communities far from urban centers receive the healthcare resources they desperately need, building stronger, healthier societies in places most often overlooked.",
    currentAmount: 2100,
    targetAmount: 4500,
    imageUrl: "/images/sample.png",
    endDate: "Mar 10, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "5",
    title: "Warm Coats for Winter",
    organization: "Warm Coats for Winter",
    description:
      "Warm Coats for Winter is a heartfelt initiative aiming to provide warmth, comfort, and protection to homeless individuals and families during the harsh winter months. Many people in our area face frigid temperatures without the proper clothing to keep them safe and healthy. Through your generous donations, we will collect, purchase, and distribute brand-new or gently used coats, scarves, gloves, and hats to those most at risk for cold-related illnesses. Each coat given represents a shield against the elements and reminds recipients that their community cares. The program also collaborates with shelters, outreach workers, and local volunteers to maximize its reach and efficiency. No one should have to face winter alone; your support helps spread warmth, hope, and dignity where it is needed most.",
    currentAmount: 3700,
    targetAmount: 6000,
    imageUrl: "/images/sample.png",
    endDate: "Apr 15, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "6",
    title: "Solar Lanterns for Students",
    organization: "Solar Lanterns for Students",
    description:
      "Many students living in remote villages lack access to reliable electricity, which greatly limits their study time after dark. Solar Lanterns for Students is dedicated to providing solar-powered lamps to children so they can continue learning and pursuing their dreams regardless of local infrastructure. With your help, this project will purchase and distribute durable, rechargeable lanterns, ensuring that students can complete their homework and read safely each evening. By enabling longer study hours, we help bridge the educational gap and empower future leaders. The initiative also promotes environmental sustainability and provides local training on proper lantern use and maintenance. Each lantern is a beacon of hope for a brighter tomorrow, illuminating the path out of poverty and toward achievement.",
    currentAmount: 1200,
    targetAmount: 4000,
    imageUrl: "/images/sample.png",
    endDate: "May 20, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "7",
    title: "Women's Vocational Training",
    organization: "Women's Vocational Training",
    description:
      "The Women's Vocational Training initiative is all about empowering women by providing them with skills that open doors to employment and economic independence. Through carefully tailored programs, women will have the opportunity to learn trades such as sewing, computer literacy, handicrafts, and small business management. The training includes practical hands-on experience, mentorship, and certification upon completion. Participants also receive resources for job placement or starting their own ventures. These opportunities not only boost individual confidence but also uplift entire families and communities by breaking the cycle of poverty. Your support funds training materials, instructors, and stipends for participants, ensuring that every motivated woman has the tools she needs to succeed and lead a self-reliant life.",
    currentAmount: 4800,
    targetAmount: 8000,
    imageUrl: "/images/sample.png",
    endDate: "Jun 25, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "8",
    title: "Disaster Relief Fund",
    organization: "Disaster Relief Fund",
    description:
      "The Disaster Relief Fund is a rapid-response program designed to aid families impacted by natural disasters such as floods, storms, earthquakes, or fires. In the wake of such emergencies, affected families often lose their homes, belongings, and access to vital services. Our mission is to provide immediate relief including food, shelter, clean water, hygiene kits, and emergency medical support. The fund also assists families in the initial stages of rebuilding and recovering from trauma. Contributions cover the costs of emergency supplies, logistics, and coordination with local agencies to deliver help where it's needed most. Your support ensures that, in their most vulnerable moments, families are not left alone but feel the compassion and solidarity of the wider community.",
    currentAmount: 9100,
    targetAmount: 12000,
    imageUrl: "/images/sample.png",
    endDate: "Jul 30, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "9",
    title: "Community Vegetable Garden",
    organization: "Community Vegetable Garden",
    description:
      "The Community Vegetable Garden drive is dedicated to establishing sustainable, communal gardens in urban and suburban neighborhoods where access to fresh produce is limited. By creating shared gardening spaces, local residents are empowered to grow their own fruits, vegetables, and herbs, improving food security and nutrition. The drive supports this effort by supplying seeds, tools, gardening education, and infrastructure such as raised beds and irrigation systems. Volunteers and community members of all ages participate in planting, tending, and harvesting, fostering a spirit of collaboration and stewardship. This initiative not only combats hunger but also encourages healthy lifestyles, environmental responsibility, and social connection among neighbors. Every donation helps transform empty lots into thriving, green oases.",
    currentAmount: 900,
    targetAmount: 2500,
    imageUrl: "/images/sample.png",
    endDate: "Aug 31, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "10",
    title: "Tech for Teens",
    organization: "Tech for Teens",
    description:
      "Tech for Teens is an innovative initiative focused on reducing the digital divide for high school students from low-income backgrounds. In today’s world, technology and internet access are crucial for quality education and future career opportunities, yet many students lack these essential tools at home. Through this drive, we aim to provide laptops, internet access, and technology training to teens who might otherwise be left behind. Donations will fund the purchase and distribution of up-to-date devices and support ongoing tech support and digital literacy workshops. By equipping young people with the technology and skills they need to keep up in school and explore new fields, we’re helping them unlock their full potential and invest in their futures.",
    currentAmount: 6350,
    targetAmount: 9000,
    imageUrl: "/images/sample.png",
    endDate: "Sep 30, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "11",
    title: "Refugee Family Starter Kits",
    organization: "Refugee Family Starter Kits",
    description:
      "Refugee Family Starter Kits aims to provide newly arrived refugee families with the basic essentials needed to start their new lives with dignity and comfort. Many refugees flee their homes with little more than the clothes on their backs, and upon arrival, they face the daunting task of rebuilding everything from scratch. Each kit includes household goods such as cookware, bedding, hygiene supplies, school supplies for children, and local information guides. The program also offers connections to local resources for language instruction, employment, and healthcare. By supporting this initiative, you play a vital role in easing the transition and helping families find hope and belonging in their new community, making a real difference in their lives.",
    currentAmount: 2500,
    targetAmount: 7000,
    imageUrl: "/images/sample.png",
    endDate: "Oct 31, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "12",
    title: "Tree Planting Drive",
    organization: "Tree Planting Drive",
    description:
      "The Tree Planting Drive focuses on restoring urban and suburban environments by planting thousands of trees in parks, along streets, and in community spaces. Trees offer countless benefits: they purify the air, provide shade, prevent soil erosion, and enhance neighborhood beauty. This initiative involves sourcing a diverse range of native saplings, organizing volunteer planting days, and educating the public about tree care and environmental stewardship. Donations help cover the costs of saplings, soil, gardening tools, and maintenance for young trees. By participating, supporters contribute to healthier, more vibrant communities and a greener planet. Planting a tree today means investing in cleaner air, cooler cities, and a legacy for future generations to cherish.",
    currentAmount: 3000,
    targetAmount: 5000,
    imageUrl: "/images/sample.png",
    endDate: "Nov 30, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
  {
    driveId: "13",
    title: "Senior Companionship Program",
    organization: "Senior Companionship Program",
    description:
      "The Senior Companionship Program was created to address social isolation among elderly members of our community, many of whom live alone or far from family. Through this program, caring volunteers are paired with elders for regular visits, check-ins, and shared activities that enrich both parties’ lives. In addition to emotional support and friendship, volunteers can assist with errands, appointments, and accessing community resources. This initiative fosters intergenerational connections and ensures seniors remain engaged, valued, and safe. Donations fund recruitment, background checks, volunteer training, and materials for activities and outings. Together, we can help ensure every senior feels seen, heard, and deeply connected to the world around them.",
    currentAmount: 4100,
    targetAmount: 6500,
    imageUrl: "/images/sample.png",
    endDate: "Dec 31, 2026",
    gallery: [
      "/images/sample.png",
      "/images/sample.png",
    ],
  },
];


export const userDonations = [{
  driveId: "1",
  amount: 500,
  date: "Dec 15, 2024",
}, {
  driveId: "2",
  amount: 1902432000435534987,
  date: "Dec 10, 2024",
}, {
  driveId: "3",
  amount: 750,
  date: "Dec 5, 2024",
}, {
  driveId: "4",
  amount: 1000,
  date: "Dec 1, 2024",
}, {
  driveId: "5",
  amount: 1500,
  date: "Nov 25, 2024",
}, {
  driveId: "6",
  amount: 2000,
  date: "Nov 20, 2024",
}, {
  driveId: "7",
  amount: 2500,
  date: "Nov 15, 2024",
}, {
  driveId: "8",
  amount: 3000,
  date: "Nov 10, 2024",
}, {
  driveId: "9",
  amount: 3500,
  date: "Nov 5, 2024",
}, {
  driveId: "10",
  amount: 4000,
  date: "Oct 31, 2024",
}, {
  driveId: "11",
  amount: 4500,
  date: "Oct 25, 2024",
}, {
  driveId: "12",
  amount: 5000,
  date: "Oct 20, 2024",
}, {
  driveId: "13",
  amount: 5500,
  date: "Oct 15, 2024",
}]