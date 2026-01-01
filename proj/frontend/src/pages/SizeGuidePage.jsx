import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
           <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Fit Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Size Charts</h1>
          <p className="text-white/60 text-lg">
            Find your perfect fit with our comprehensive size guides.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="tops" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/10 p-1 rounded-full">
                <TabsTrigger value="tops" className="rounded-full px-8 py-2 data-[state=active]:bg-amber-400 data-[state=active]:text-black text-white/60">Tops</TabsTrigger>
                <TabsTrigger value="bottoms" className="rounded-full px-8 py-2 data-[state=active]:bg-amber-400 data-[state=active]:text-black text-white/60">Bottoms</TabsTrigger>
                <TabsTrigger value="shoes" className="rounded-full px-8 py-2 data-[state=active]:bg-amber-400 data-[state=active]:text-black text-white/60">Shoes</TabsTrigger>
              </TabsList>
            </div>

            {/* Tops Table */}
            <TabsContent value="tops">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/10 text-white">
                      <tr>
                        <th className="p-4 font-medium">Size</th>
                        <th className="p-4 font-medium">Chest (in)</th>
                        <th className="p-4 font-medium">Waist (in)</th>
                        <th className="p-4 font-medium">Shoulder (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70 divide-y divide-white/5">
                      <tr><td className="p-4">XS</td><td className="p-4">32-34</td><td className="p-4">26-28</td><td className="p-4">16.5</td></tr>
                      <tr><td className="p-4">S</td><td className="p-4">34-36</td><td className="p-4">28-30</td><td className="p-4">17.0</td></tr>
                      <tr><td className="p-4">M</td><td className="p-4">38-40</td><td className="p-4">32-34</td><td className="p-4">17.5</td></tr>
                      <tr><td className="p-4">L</td><td className="p-4">42-44</td><td className="p-4">36-38</td><td className="p-4">18.0</td></tr>
                      <tr><td className="p-4">XL</td><td className="p-4">46-48</td><td className="p-4">40-42</td><td className="p-4">18.5</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Bottoms Table */}
             <TabsContent value="bottoms">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/10 text-white">
                      <tr>
                        <th className="p-4 font-medium">Size</th>
                        <th className="p-4 font-medium">Waist (in)</th>
                        <th className="p-4 font-medium">Hips (in)</th>
                        <th className="p-4 font-medium">Inseam (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70 divide-y divide-white/5">
                      <tr><td className="p-4">28</td><td className="p-4">28-29</td><td className="p-4">34-36</td><td className="p-4">30</td></tr>
                      <tr><td className="p-4">30</td><td className="p-4">30-31</td><td className="p-4">36-38</td><td className="p-4">30/32</td></tr>
                      <tr><td className="p-4">32</td><td className="p-4">32-33</td><td className="p-4">38-40</td><td className="p-4">32</td></tr>
                      <tr><td className="p-4">34</td><td className="p-4">34-35</td><td className="p-4">40-42</td><td className="p-4">32/34</td></tr>
                      <tr><td className="p-4">36</td><td className="p-4">36-37</td><td className="p-4">42-44</td><td className="p-4">34</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Shoes Table */}
             <TabsContent value="shoes">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/10 text-white">
                      <tr>
                        <th className="p-4 font-medium">US Size</th>
                        <th className="p-4 font-medium">UK Size</th>
                        <th className="p-4 font-medium">EU Size</th>
                        <th className="p-4 font-medium">CM</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70 divide-y divide-white/5">
                      <tr><td className="p-4">7</td><td className="p-4">6</td><td className="p-4">40</td><td className="p-4">25.0</td></tr>
                      <tr><td className="p-4">8</td><td className="p-4">7</td><td className="p-4">41</td><td className="p-4">26.0</td></tr>
                      <tr><td className="p-4">9</td><td className="p-4">8</td><td className="p-4">42</td><td className="p-4">27.0</td></tr>
                      <tr><td className="p-4">10</td><td className="p-4">9</td><td className="p-4">43</td><td className="p-4">28.0</td></tr>
                      <tr><td className="p-4">11</td><td className="p-4">10</td><td className="p-4">44</td><td className="p-4">29.0</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}