'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { PLANS } from '@/lib/plans';
import Link from 'next/link';

export default function BillingPage() {
  // For now, everyone is on the free plan. Stripe integration adds plan detection.
  const currentPlan = PLANS[0]; // FREE
  const usage = 0; // Would come from stats API
  const limit = currentPlan.documentsPerMonth;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Billing</h1>
        <p className="text-[13px] text-muted-foreground">Manage your plan and usage.</p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Current plan</CardTitle>
            <Badge variant="secondary">{currentPlan.name}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-[13px] mb-1">
              <span className="text-muted-foreground">Documents this month</span>
              <span className="font-medium">{usage} / {limit}</span>
            </div>
            <Progress value={limit > 0 ? (usage / limit) * 100 : 0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid gap-5 sm:grid-cols-3">
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan.id;
          return (
            <Card key={plan.id} className={`flex flex-col ${plan.popular ? 'border-foreground/20 shadow-md' : ''}`}>
              {plan.popular && (
                <div className="bg-foreground text-background text-[11px] font-medium text-center py-1 -mt-px -mx-px rounded-t-lg">
                  Most popular
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="text-2xl font-semibold">
                  {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
                </div>
                <CardDescription className="text-[13px]">
                  {plan.documentsPerMonth === -1 ? 'Unlimited' : plan.documentsPerMonth} documents/month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]">
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <Button variant="outline" className="w-full" size="sm" disabled>Current plan</Button>
                ) : plan.price === 0 ? (
                  <Button variant="outline" className="w-full" size="sm" disabled>Included</Button>
                ) : (
                  <Button variant={plan.popular ? 'default' : 'outline'} className="w-full" size="sm">
                    Upgrade to {plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-[12px] text-muted-foreground">
        Stripe billing integration coming soon. Contact us to upgrade manually.
      </p>
    </div>
  );
}
