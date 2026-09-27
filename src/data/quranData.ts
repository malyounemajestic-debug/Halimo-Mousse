import { QuranSurah } from '../types';

export const initialSurahs: QuranSurah[] = [
  {
    id: 1,
    name: 'Al-Fatihah',
    arabicName: 'الفاتحة',
    englishMeaning: 'The Opening',
    somaliMeaning: 'Furaha Qur’aanka',
    versesCount: 7,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/001.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        somali: 'Magaca Eebbe yaan ku bilaabaynaa ee Naxariis Guud iyo mid Gaaraba Naxariista.',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        somali: 'Mahad Eebbaa iska leh oo ah Rabbiga Caalamka (Koonka).',
        english: '[All] praise is [due] to Allah, Lord of the worlds.'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        somali: 'Ee Naxariis Guud iyo mid Gaaraba Naxariista.',
        english: 'The Entirely Merciful, the Especially Merciful.'
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        somali: 'Ee Hanta Maalinta Abaalmarinta (Qiyaamada).',
        english: 'Sovereign of the Day of Recompense.'
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        somali: 'Adigoo kaliya ayaan ku caabudaynaa, adigoo kaliyana gargaar ayaan kaa kaysanaynaa.',
        english: 'It is You we worship and You we ask for help.'
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        somali: 'Nagu toosi Jidka toosan.',
        english: 'Guide us to the straight path.'
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        somali: 'Jidka kuwii aad u Nicmaysay, oon ahayn kuwii loo carooday iyo kuwa baadiyoobay toona.',
        english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.'
      }
    ]
  },
  {
    id: 67,
    name: 'Al-Mulk',
    arabicName: 'الملك',
    englishMeaning: 'The Sovereignty',
    somaliMeaning: 'Boqortooyada',
    versesCount: 30,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/067.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        somali: 'Waxaa barakoobay oo sareeyay Eebaha gacantiisa ay ku jirto Boqortooyadu, waana mid wax kasta kara.',
        english: 'Blessed is He in whose hand is dominion, and He is over all things competent.'
      },
      {
        number: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        somali: 'Eebaha abuuray Geerida iyo Nolosha si uu idiin imtixaano kiinna camal wanaagsan, waana Adkaade Dambi Dhaafa.',
        english: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving.'
      },
      {
        number: 3,
        arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
        somali: 'Eebaha abuuray toddoba samo oo is dulsaaran, kuma arkeysid abuuridda Eebaha Naxariista wax kala dhiman, ee celceli aragga ma aragtaa meel dilaacsan.',
        english: '[And] who created seven heavens in layers. You see not in the creation of the Most Merciful any inconsistency. So return [your] vision to the sky; do you see any breaks?'
      },
      {
        number: 4,
        arabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',
        somali: 'Kaddibna celceli aragga mar labaad iyo mar kale, wuxuu kuusoo laaban araggu isagoo liita oo daalan.',
        english: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.'
      },
      {
        number: 5,
        arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ',
        somali: 'Waxaan ku qurxinnay samada dhow siraaddo (xiddigo), waxaanna ka dhignay kuwo lagu gano shayaadiinta, waxaanna u diyaarrinay cadaabka naarta Saqiir.',
        english: 'And We have certainly beautified the nearest heaven with stars and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.'
      }
    ]
  },
  {
    id: 55,
    name: 'Ar-Rahman',
    arabicName: 'الرحمن',
    englishMeaning: 'The Beneficent',
    somaliMeaning: 'Naxariistaha Guud',
    versesCount: 78,
    revelationType: 'Medinan',
    audioUrl: 'https://server8.mp3quran.net/afs/055.mp3',
    completed: false,
    verses: [
      {
        number: 1,
        arabic: 'الرَّحْمَٰنُ',
        somali: 'Eebaha Naxariista guud.',
        english: 'The Most Merciful.'
      },
      {
        number: 2,
        arabic: 'عَلَّمَ الْقُرْآنَ',
        somali: 'Wuxuu baray Qur’aanka.',
        english: 'Taught the Qur\'an.'
      },
      {
        number: 3,
        arabic: 'خَلَقَ الْإِنسَانَ',
        somali: 'Wuxuu abuuray Dadka.',
        english: 'Created man.'
      },
      {
        number: 4,
        arabic: 'عَلَّمَهُ الْبَيَانَ',
        somali: 'Wuxuu baray hadalka cad.',
        english: '[And] taught him eloquence.'
      },
      {
        number: 5,
        arabic: 'الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ',
        somali: 'Qorraxda iyo Dayaxu waxay ku socdaan xisaab qiyaasan.',
        english: 'The sun and the moon [move] by precise calculation.'
      },
      {
        number: 6,
        arabic: 'وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ',
        somali: 'Xiddigaha iyo dhirtuba way sujuudaan (u hoggaansamaan Eebbe).',
        english: 'And the stars and trees prostrate.'
      },
      {
        number: 13,
        arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
        somali: 'Ee nicmooyinkee Rabbigiin ayaad beeninaysaan labadiina kooxood (dadka iyo jinka)?',
        english: 'So which of the favors of your Lord would you deny?'
      }
    ]
  },
  {
    id: 36,
    name: 'Ya-Sin',
    arabicName: 'يس',
    englishMeaning: 'Ya-Sin (Heart of the Quran)',
    somaliMeaning: 'Yaasiin (Wadnaha Qur’aanka)',
    versesCount: 83,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/036.mp3',
    completed: false,
    verses: [
      {
        number: 1,
        arabic: 'يس',
        somali: 'Yaa-Siin (Allaah baa og macnaheeda).',
        english: 'Ya, Seen.'
      },
      {
        number: 2,
        arabic: 'وَالْقُرْآنِ الْحَكِيمِ',
        somali: 'Waxaana ku dhaartay Qur’aanka xigmadda badan.',
        english: 'By the wise Qur\'an.'
      },
      {
        number: 3,
        arabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
        somali: 'Waxaad adigu ka mid tahay kuwa la soo diray (Rasuullada).',
        english: 'Indeed you, [O Muhammad], are from among the messengers.'
      },
      {
        number: 4,
        arabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
        somali: 'Oo ku taagan waddo toosan.',
        english: 'On a straight path.'
      },
      {
        number: 5,
        arabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ',
        somali: 'Waa soo dajinta Eebaha Adkaada ee Naxariista.',
        english: '[This is] a revelation of the Exalted in Might, the Merciful.'
      }
    ]
  },
  {
    id: 93,
    name: 'Ad-Duha',
    arabicName: 'الضحى',
    englishMeaning: 'The Morning Brightness',
    somaliMeaning: 'Barqada',
    versesCount: 11,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/093.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'وَالضُّحَىٰ',
        somali: 'Waxaana ku dhaartay Barqada.',
        english: 'By the morning brightness.'
      },
      {
        number: 2,
        arabic: 'وَاللَّيْلِ إِذَا سَجَىٰ',
        somali: 'Iyo Habeenka markuu dego oo iftiinkiisu tago.',
        english: 'And [by] the night when it covers with darkness.'
      },
      {
        number: 3,
        arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ',
        somali: 'Kuma uusan dhaafin Rabbigaa kumana uusan nixin.',
        english: 'Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you].'
      },
      {
        number: 4,
        arabic: 'وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ',
        somali: 'Aakhiraana kuugu khayr roon adduunka.',
        english: 'And the Hereafter is better for you than the first [life].'
      },
      {
        number: 5,
        arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
        somali: 'Wuxuu ku siin doonaa Rabbigaa waanad raalli noqon doontaa.',
        english: 'And your Lord is going to give you, and you will be satisfied.'
      }
    ]
  },
  {
    id: 94,
    name: 'Al-Inshirah',
    arabicName: 'الشرح',
    englishMeaning: 'The Relief / Expansion',
    somaliMeaning: 'Ballaadhinta Laabta',
    versesCount: 8,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/094.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
        somali: 'Miyeynaan kuu ballaadhin laabtaada?',
        english: 'Did We not expand for you, [O Muhammad], your breast?'
      },
      {
        number: 2,
        arabic: 'وَوَضَعْنَا عَنكَ وِزْرَكَ',
        somali: 'Oo aannaan kaa rogayn culayskaagii?',
        english: 'And We removed from you your burden.'
      },
      {
        number: 5,
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        somali: 'Dhib kasta wuxuu la socdaa fudayd.',
        english: 'For indeed, with hardship [will be] ease.'
      },
      {
        number: 6,
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        somali: 'Haddana dhib kasta wuxuu la socdaa fudayd.',
        english: 'Indeed, with hardship [will be] ease.'
      },
      {
        number: 7,
        arabic: 'فَإِذَا فَرَغْتَ فَانصَبْ',
        somali: 'Haddaba markaad hawl ka faraxalatid u istaag cibaadada Eebbe.',
        english: 'So when you have finished [your duties], then stand up [for worship].'
      },
      {
        number: 8,
        arabic: 'وَإِلَىٰ رَبِّكَ فَارْغَب',
        somali: 'Xagga Rabbigaana u dhowow adigoo raalli ahaansho doonaya.',
        english: 'And to your Lord direct [your] longing.'
      }
    ]
  },
  {
    id: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإخلاص',
    englishMeaning: 'The Sincerity',
    somaliMeaning: 'Daacadda (Kala Saarka Towxiidka)',
    versesCount: 4,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/112.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        somali: 'Waxaad dhahdaa: Eebbe waa Mid kaliya.',
        english: 'Say, "He is Allah, [who is] One,'
      },
      {
        number: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        somali: 'Eebbe waa wax kasta loo baahanyahay oo aan cidna u baahnayn.',
        english: 'Allah, the Eternal Refuge.'
      },
      {
        number: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        somali: 'Wax ma dhalin lamana dhalin.',
        english: 'He neither begets nor is born,'
      },
      {
        number: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        somali: 'Wax la mid ahina ma jiro haba yaraatee.',
        english: 'Nor is there to Him any equivalent."'
      }
    ]
  },
  {
    id: 113,
    name: 'Al-Falaq',
    arabicName: 'الفلق',
    englishMeaning: 'The Daybreak',
    somaliMeaning: 'Waagacusub',
    versesCount: 5,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/113.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        somali: 'Waxaad dhahdaa: Waxaan ku magan galay Rabbiga waagacusub.',
        english: 'Say, "I seek refuge in the Lord of daybreak.'
      },
      {
        number: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        somali: 'Shar kasta oo uu abuuray.',
        english: 'From the evil of that which He created.'
      },
      {
        number: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        somali: 'Iyo sharta habeenka markuu madoobaado.',
        english: 'And from the evil of darkness when it settles.'
      },
      {
        number: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        somali: 'Iyo sharta sixiroolayaasha guntimaha ku tufaya.',
        english: 'And from the evil of the blowers in knots.'
      },
      {
        number: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        somali: 'Iyo sharta xaasidka markuu wax xaasido.',
        english: 'And from the evil of an envier when he envies."'
      }
    ]
  },
  {
    id: 114,
    name: 'An-Nas',
    arabicName: 'الناس',
    englishMeaning: 'Mankind',
    somaliMeaning: 'Dadka',
    versesCount: 6,
    revelationType: 'Meccan',
    audioUrl: 'https://server8.mp3quran.net/afs/114.mp3',
    completed: true,
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        somali: 'Waxaad dhahdaa: Waxaan ku magan galay Rabbiga dadka.',
        english: 'Say, "I seek refuge in the Lord of mankind,'
      },
      {
        number: 2,
        arabic: 'مَلِكِ النَّاسِ',
        somali: 'Boqorka dadka.',
        english: 'The Sovereign of mankind,'
      },
      {
        number: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        somali: 'Ilaaha dhabta ah ee dadka.',
        english: 'The God of mankind,'
      },
      {
        number: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        somali: 'Sharta waswaasiyaha dhuumaalaysta (shaydaanka).',
        english: 'From the evil of the retreating whisperer -'
      },
      {
        number: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        somali: 'Kaas oo wax ku waswaasiya laabaha dadka.',
        english: 'Who whispers [evil] into the breasts of mankind -'
      },
      {
        number: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        somali: 'Kuna jira jinka iyo dadkaba.',
        english: 'From among the jinn and mankind."'
      }
    ]
  }
];
